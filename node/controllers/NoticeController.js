
const asyncHandler = require("express-async-handler");

const Notice = require("../models/NoticeModel");
const jwt = require("jsonwebtoken");

const get = asyncHandler(async (req, res) => {
    const notices = await Notice.find({})
    if(notices)
     {
      res.status(200).json({notices});

    }
})

const add = asyncHandler(async (req, res) => {
try {
  const {title,description}=req.body
  const notice = await Notice.create({title,description})
  if(notice)
  res.status(200).json({'success':"Added!"});

} catch (err) {
    console.log(err)
}
})

  
//delete notice
const deleteNotice=asyncHandler(async(req,res)=>{
  try {
    const {id}=req.params
   const notice = await Notice.findByIdAndRemove(id)
   if(notice) 
   res.json({ 'message': "Deleted!" })
  } catch (err) {
    console.log(err)
  }
})

module.exports = {get,add,deleteNotice};
