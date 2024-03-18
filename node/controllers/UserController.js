const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");
const Group = require("../models/GroupModel");
const Meeting = require("../models/MeetingModel")
const Project = require("../models/ProjectModel")

const ObjectId = require('mongoose').Types.ObjectId;

var fs = require('fs');
const GroupChatModel = require("../models/GroupModel");
const MeetingModel = require("../models/MeetingModel");
const TeacherModel = require("../models/TeacherModel");
const NotificationModel = require("../models/NotificationModel");

//Login user
const loginUser = asyncHandler(async (req, res) => {
  
  try {
    const { email, password, type } = req.body;
    
    if (!email || !password) {
      res.status(400);
      throw new Error("Please enter all fields as all are mandatory!");
    }
    
    let auth;
    
    if (type == 'Admin') {
      
      auth = {
        _id: new ObjectId("6450cacf9c60caad5198c9cb"),
        email: 'admin@uow.edu.pk',
        password: 'admin123',
        username: 'admin',
        type: 'Admin'
      }
    }
    else
    auth = await User.findOne({ email, password, type });
    
    if (auth) {
      
      jwt.sign({
        user: {
          username: auth.username,
          id: auth._id,
          type,
        },
      }, process.env.Access_Token, (er, token) => {
        if (er)
        res.send("Cannot Login");
        
        res.cookie("jwt", token);
        res.status(200).json({ "username": auth.username });
      })
      
    } else {
      res.status(401);
      throw new Error("email or password is not valid");
    }
  } catch (err) {
    res.status(500).json({ "message": err });
    
  }
  
});



//auth user
const authUser = asyncHandler(async (req, res) => {
  
  try {
    const token = req.cookies.jwt
    
    if (!token) {
      res.json({ 'is_login': false })
    }
    else {
      const details = jwt.decode(token)
      const username = details.user.username
      const type = details.user.type
      const id = details.user.id
      
      const filter = { $or: [{ 'student1': id }, { 'student2': id }, { 'student3': id }] };
      
      var hasGroup = false
      var meet
      
      if(type == 'Student')
      {
        
        const group = await Group.findOne(filter)
        
        if(group)
        hasGroup = true
        
        meet = await Meeting.aggregate([
          {
            $unwind: '$attendees'
          },
          {
            $match: {
              'attendees.student': new ObjectId(id)
            }
          },
          {
            $group: {
              _id: '$attendees.student',
              absenceCount: {
                $sum: { $cond: [{ $eq: ['$attendees.present', false] }, 1, 0] }
              }
            }
          }
        ])
        
        meet = meet[0]
      }else if(type == 'Admin'){
        const meetings = await Meeting.find()
        
        // meets = countMeets(meetings)
        
      }
      
      res.json({ 'is_login': true, username, type, id,hasGroup,meet })
    }
    
  } catch (err) {
    console.log(err)
  }
})


//logout user
const logoutUser = asyncHandler(async (req, res) => {
  
  res.cookie("jwt", '')
  res.json({ 'message': "Logged Out!" })
  
})

// Get all users
const allUsers = asyncHandler(async (req, res) => {
  
  const token = req.cookies.jwt
  let users
  
  if (!token) {
    users = await User.find();
  } else {
    const details = jwt.decode(token)
    const author = details.user.id
    users = await User.find({ _id: { $ne: author } });
    
  }
  res.status(200).json(users);
});

//delete user
const deleteUser=asyncHandler(async(req,res)=>{
  try {
    const {id}=req.params
    
    const filter = { $or: [{ 'student1': id }, { 'student2': id }, { 'student3': id } , {'supervisor':id}] };
    const group = await Group.findOne(filter)
    
    const chatfilter = {$or: [{'sender':id},{'receiver':id}]}
    
    const chat = await GroupChatModel.deleteMany(chatfilter);
    
    if(group)
    {
      const project = await Project.findByIdAndRemove(group.project)
      
    }
    
    const teacher = await TeacherModel.findOneAndRemove({'user':id})
    
    const filterMeet = {
      'attendees.student': id
    };
    const meeting = await MeetingModel.deleteMany(filterMeet);
    
    const user = await User.findByIdAndRemove(id)
    var groupp = await Group.findOne(filter)
    if(user) 
    res.json({ 'message': "Deleted!" })
  } catch (err) {
    console.log(err)
  }
})

const get=asyncHandler(async(req,res)=>{
  try {
    const {id}=req.params 
    const user =await User.findById(id)
    
    if(user)
    res.status(200).json({ user });
  } catch (err) {
    console.log(err)
  }
}) 

const update=asyncHandler(async(req,res)=>{
  try {
    
    const { email, username ,id,password} = req.body;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (email) {
      user.email = email;
    }
    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = password;
    }
    
    if (req.file) {
      const cover = {
        data: fs.readFileSync((process.cwd() + '/uploads/' + req.file.filename)),
        contentType : 'image/jpeg'
      }
      
      user.cover = cover
    }
    
    const update =await user.save();
    if(update)
    {
      res.status(200).json({ user });
      
    }
    
  } catch (err) {
    console.log(err)
  }
})

const pass=asyncHandler(async(req,res)=>{ 
  try {
    const { password,email } = req.body;
    const user = await User.findOne({email});
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.password = password;
    const update =await user.save();
    if(update)
    {
      res.status(200).json({ user });
      
    }
  } catch (err) {
    console.log(err)
  }
  
})

const notifcation=asyncHandler(async(req,res)=>{ 
  try {
    const token = req.cookies.jwt
    
    if (!token) {
      res.json({ 'is_login': false })
    }
    else {
      const details = jwt.decode(token)
      const id = details.user.id
      const notifcations = await NotificationModel.find({'user':id})
      if(notifcations)
      res.status(200).json({ notifcations });
    }
    
  } catch (err) {
    console.log(err)
  }
  
})
module.exports = { loginUser, authUser, logoutUser, allUsers ,deleteUser,get,update,pass,notifcation};
