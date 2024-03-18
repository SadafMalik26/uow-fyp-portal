
const asyncHandler = require("express-async-handler");

const FacultyProject = require("../models/FacultyProjectModel");
const jwt = require("jsonwebtoken");

const get = asyncHandler(async (req, res) => {
    const FacultyProjects = await FacultyProject.find({})
    if(FacultyProjects)
    {
      res.status(200).json({FacultyProjects});
 
    }
}) 

const add = asyncHandler(async (req, res) => {
try {
    const {title,supervisorname} = req.body
    const facultyproject = await FacultyProject.create({
      title,supervisorname
      });
      
      if(facultyproject )
      {
        res.status(200).json({ 'message': "Success!" });

      }
} catch (err) {
    console.log(err)
}
})
  
//deletefacultyproject 
const deleteFacultyProject=asyncHandler(async(req,res)=>{
  try {
    const {id}=req.params
   const facultyproject  = await FacultyProject.findByIdAndRemove(id)
   if(facultyproject) 
   res.json({ 'message': "Deleted!" })
  } catch (err) {
    console.log(err)
  }
})

module.exports = {get,add,deleteFacultyProject};

