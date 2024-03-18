const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel");
const Teacher = require("../models/TeacherModel");
const Slot = require("../models/TeacherSlotsModel");
const Group = require("../models/GroupModel");
const Project = require("../models/ProjectModel");
const Notification = require("../models/NotificationModel");

const jwt = require("jsonwebtoken");
var fs = require('fs');

const ObjectId = require('mongoose').Types.ObjectId;

const type = 'Teacher'

const add = asyncHandler(async (req, res) => {
  
  const { email, username, password, qualification,interest } = req.body
  
  try{
    
    const cover = {
      data: fs.readFileSync((process.cwd() + '/uploads/' + req.file.filename)),
      contentType : 'image/jpeg'
    }
    
    const user = await User.create({
      email, username, password, type,cover
    });
    
    if (user) {
      
      const teacher = await Teacher.create({
        qualification, 'user': user._id,interest
      });
      
      if (teacher)
      res.status(200).json({ 'message': "Succussfully Added" });
      
      else
      throw new Error("error");
      
    } else
    throw new Error("error");
  }catch(e){
    res.status(500).json({ 'message': 'Email Already Taken' });
  }
  
})

const count = asyncHandler(async (req, res) => {
  
  try {
    const teacherCount = await User.find({ type }).count()
    res.status(200).json({ teacherCount });
  } catch (err) {
    console.log(err)
  }
  
})


const slotsCount = asyncHandler(async (req, res) => {
  try {
    const teacherId = req.params.id
    
    const bookedCount = await Slot.find({ 'teacher': teacherId , isBooked:true}).count()
    
    const totalCount = await Slot.find({ 'teacher': teacherId}).count()
    const availableCount = totalCount - bookedCount
    
    res.status(200).json({ bookedCount,totalCount,availableCount });
  } catch (err) {
    console.log(err)
  }
  
})


const list = asyncHandler(async (req, res) => {
  
  try {
    const teachers = await User.aggregate([
      {
        $match: {
          type
        }
      },
      {
        $lookup: {
          from: "teachers",
          localField: "_id",
          foreignField: "user",
          as: "teacher"
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          cover:1,
          qualification: { $arrayElemAt: ['$teacher.qualification', 0] },
          interest: { $arrayElemAt: ['$teacher.interest', 0] },
          
        }
      }
    ]).sort({ '_id': -1 })
    
    res.status(200).json({ teachers });
  } catch (err) {
    console.log(err)
  }
  
})

const qualification = asyncHandler(async (req, res) => {
  
  
  try {
    const teacher = await User.aggregate([
      {
        $match: {
          _id: new ObjectId(req.params.id)
        }
      },
      {
        $lookup: {
          from: "teachers",
          localField: "_id",
          foreignField: "user",
          as: "teacher"
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          cover:1,
          qualification: { $arrayElemAt: ['$teacher.qualification', 0] }
        }
      }
    ])
    
    res.status(200).json({ 'teacher':teacher[0] });
  } catch (err) {
    console.log(err)
  }
  
})

const addSlot = asyncHandler(async (req, res) => {
  try {
    
    const token = req.cookies.jwt
    const details = jwt.decode(token)
    const { date, time } = req.body
    const teacherId = details.user.id
    
    const slot = await Slot.create({
      teacher: teacherId,
      isBooked: false,
      date,
      time
    });
    
    if (slot)
    res.status(200).json({ 'message': "Succussfully Added" });
    else
    throw new Error("error");
  } catch (err) {
    console.log(err)
  }
  
})

const slots = asyncHandler(async (req, res) => {
  
  try {

    const token = req.cookies.jwt
    const details = jwt.decode(token)

    const teacherId = req.params.id
    
    const slots = await Slot.find({ 'teacher': teacherId })
    
    res.status(200).json({ slots });
  } catch (err) {
    console.log(err)
  }
  
})

const mySlots = asyncHandler(async (req, res) => {
  
  try {
    const token = req.cookies.jwt
    const details = jwt.decode(token)
    
    const authType = details.user.type
    const authId = details.user.id
    
    let slots;
    
    if (authType == "Teacher") {
      const teacher = authId
      slots = await Slot.find({ teacher }).populate({
        path: 'group',
        populate: {
          path: 'project student1 student2 student3'
        }
      })
    } else if (authType == "Student") {
      const student = authId
      const filter = { $or: [{ 'student1': student }, { 'student2': student }, { 'student3': student }] }
      const group = await Group.findOne(filter)
      if(group)
      slots = await Slot.find({ group:group._id }).populate('group')
      
    }
    res.status(200).json({ slots });
  } catch (err) {
    console.log('err',err)
  }
  
})

const editSlot = asyncHandler(async (req, res) => {
  
  //slot details
  try {
    
    const {status,id} = req.body.slot
    
    //1st student will be loggedin one
    const token = req.cookies.jwt
    const data = jwt.decode(token)
    const auth = data.user.id
    
    //request status pending from frontend
    if(status == "pending")
    {
      //group membrs
      const {valueStudent2,valueStudent3} = req.body.group
      
      //project details
      const {title,details} = req.body.project
      
   
      const project = await Project.create({
        title, details, status: 'Accepted' 
      });
      
      if(project)
      {
        const group = await Group.create({ student1:auth, student2:valueStudent2, student3: valueStudent3,project: project._id});
        if(group){
          const slot =  await Slot.updateOne({ _id: id },
            { status, isBooked: true, group:group._id })
            if(slot)
            res.status(200).json({ 'message': "Success!" });
            
          }
        }
      }
      else if( status == "reject" ||  status == "improve")
      {
        const slot =  await Slot.findOne({ _id: id })
        // Find the group
        const group = await Group.findOne({ _id: slot.group });
  
        if (group) {
        const project = await Project.findOneAndRemove({_id:group.project})

          // Create a notification for each student in the group
          const students = [group.student1, group.student2, group.student3];
          const notifications = [];

          var message ='Your Project has been rejected.'

          if( status == "improve")
          message = "Your Project idea is good, but you need some imrprovements. Kindly improve and book again"

          
          for (const studentId of students) {

            const notification = await Notification.create({
              user: studentId,
              message
            })
            
          }
          
          // Delete the group
          await Group.findByIdAndRemove(group._id);
          const slot =  await Slot.findOneAndRemove({ _id: id })
          if(slot)
          {
            res.status(200).json({ 'message': "Success!" });
          }
        }

        }
        else if( status == "accept")
        {
          
          const slot =  await Slot.findOneAndUpdate({ _id: id },
            { status })
            
            if(slot)
            {
              const group = await Group.findOneAndUpdate({_id:slot.group},{supervisor:auth})
              if(group)
              {
                const project = await Project.findOneAndUpdate({_id:group.project},{status:"accepted"})
                
                
                res.status(200).json({ 'message': "Success!" });
                
              }
            }
          }
          
        } catch (err) {
          console.log(err)
        }
        
      })
      
      module.exports = { count, list, add, qualification, addSlot, slots, editSlot, mySlots ,slotsCount};
      