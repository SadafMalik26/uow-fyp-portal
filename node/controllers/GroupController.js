const asyncHandler = require("express-async-handler");

const Group = require("../models/GroupModel");
const User =  require("../models/UserModel")

const list = asyncHandler(async (req, res) => {
    
    try {
        const groups = await Group.find().populate('student1 student2 student3 project supervisor')
        
        res.status(200).json({ groups });
    } catch (err) {
        res.status(500).json({ 'message': e });
        
    }
    
})

const without = asyncHandler(async (req, res) => {
    
    try {
        var students=[]
        const groupStudents = await Group.find({}).populate("student1 student2 student3");
        
        if(groupStudents)
        {
            const groupStudentIds = new Set();
            
            groupStudents.forEach((group) => {
                groupStudentIds.add(group.student1);
                groupStudentIds.add(group.student2);
                groupStudentIds.add(group.student3);
            });
            
            
            students = await User.find({ type: "Student", _id: { $nin: [...groupStudentIds] } });
        }else{
            students = await User.find({ type: "Student"});
            
        }
        
        
        res.status(200).json({ students });
        
        
    } catch (err) {
        res.status(500).json({ 'message': e });
        
    }
    
})

const add = asyncHandler(async (req, res) => {
    
    try {
        const student1 = req.body.valueStudent1
        let student2 = req.body.valueStudent2
        let student3 = req.body.valueStudent3
        
        if (student2 == '' || student2 == '--SELECT--')
        student2 = null
        if (student3 == '' || student3 == '--SELECT--')
        student3 = null
        
        const group = await Group.create({ student1, student2, student3 });
        
        if (group) {
            res.status(200).json({ 'message': "Succussfully Added" });
        } 
        
    } catch (err) {
        throw new Error(e);
    }
})

const attendees = asyncHandler(async (req, res) => {
    try {
        
        const {id} = req.params
        const group = await Group.findById(id)
        .select("student1 student2 student3")
        .populate("student1", "-password") // Populate student1 with user details (excluding password)
        .populate("student2", "-password") // Populate student2 with user details (excluding password)
        .populate("student3", "-password") // Populate student3 with user details (excluding password)
        
        const students = [group.student1, group.student2, group.student3];

        if(students)
        res.status(200).json({ students });
    } catch (err) {
        console.log(err)
    }

    
})

module.exports = { add, list,without,attendees };