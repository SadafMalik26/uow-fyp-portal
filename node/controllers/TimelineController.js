const asyncHandler = require("express-async-handler");
const Timeline = require("../models/TimelineModel");

const jwt = require("jsonwebtoken");

const get = asyncHandler(async (req, res) => {
    const timelines = await Timeline.find({})
     if(timelines)
     {
      res.status(200).json({timelines});

    }
})


const add = asyncHandler(async (req, res) => {
    
    try {
        const {title,description,date}=req.body
        const timeline = await Timeline.create({title,description,date})
        if(timeline)
        res.status(200).json({'success':"Added!"});
      
      } catch (err) {
          console.log(err)
    }
    })

const edit = asyncHandler(async (req, res) => {
    
    try {
        const {id,date} = req.body
        const description = req.body.updatedDescription
        const timeline = await Timeline.findByIdAndUpdate(id,{title,date,description})
        if(timeline)
        res.status(200).json({ 'success':"updated" });
    
} catch (err) {
    throw new Error(err);
}
})
const deleteTimeline=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
       const timeline = await Timeline.findByIdAndRemove(id)
       if(timeline) 
       res.json({ 'message': "Deleted!" })
      } catch (err) {
        console.log(err)
      }
    })

module.exports = { add, get ,edit,deleteTimeline};




