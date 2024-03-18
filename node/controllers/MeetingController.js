
const asyncHandler = require("express-async-handler");

const Meeting =  require("../models/MeetingModel")
const Group =  require("../models/GroupModel")
const jwt = require("jsonwebtoken");
const Notification = require("../models/NotificationModel");


const add = asyncHandler(async (req, res) => {
  const {id,attendees,currentDate} = req.body
  
  const token = req.cookies.jwt
  const details = jwt.decode(token)
  const teacher = details.user.id
  
  const meeting = await Meeting.create({group:id,attendees,currentDate,teacher})
  
  if(meeting)
  {
    
    res.status(200).json({'message':'Success!' });
  }
  
})

const list = asyncHandler(async (req, res) => {
  
  const token = req.cookies.jwt
  const details = jwt.decode(token)
  const id = details.user.id
  const type = details.user.type
  
  var meetings
  
  if(type == 'Teacher')
  {
    meetings= await Meeting.find({'teacher':id}).populate("attendees.student", "username");
  }
  if(type == 'Student')
  {
    const filter = { $or: [{ 'student1': id }, { 'student2': id }, { 'student3': id }] };
    const group = await Group.findOne(filter)
    
    meetings= await Meeting.find({group}).populate("attendees.student", "username")
  }
  
  res.status(200).json({meetings });
})

const percentage = asyncHandler(async (req, res) => {
  
  try {
    
    const {id} = req.params
    const meetings = await Meeting.find({group:id})
    .populate('attendees.student')
    
    const students = await calculatePercentage(meetings);
    
    res.status(200).json({students });
    
  } catch (err) {
    console.log(err)
  }
})


async function calculatePercentage(meetings) {
  const students = {};
  
  meetings?.forEach((meeting) => {
    meeting.attendees.forEach((attendee) => {
      const studentId = attendee.student._id.toString();
      if (attendee.present) {
        if (!students[studentId]) {
          students[studentId] = {
            attendanceCount: 1,
            totalMeetings: 1,
            student: attendee.student,
          };
        } else {
          students[studentId].attendanceCount++;
          students[studentId].totalMeetings++;
        }
      } else {
        if (!students[studentId]) {
          students[studentId] = {
            attendanceCount: 0,
            totalMeetings: 1,
            student: attendee.student,
          };
        } else {
          students[studentId].totalMeetings++;
        }
      }
    });
  });
  
  Object.keys(students).forEach((studentId) => {
    const student = students[studentId];
    student.percentage = (student.attendanceCount / student.totalMeetings) * 100;
  });
  
  return students;
}
module.exports = { add, list,percentage};
