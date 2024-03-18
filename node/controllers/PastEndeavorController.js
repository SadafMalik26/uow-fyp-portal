
const asyncHandler = require("express-async-handler");

const PastEndeavor = require("../models/PastEndeavorModel");
const jwt = require("jsonwebtoken");

const get = asyncHandler(async (req, res) => {
    const PastEndeavors = await PastEndeavor.find({})
    if(PastEndeavors)
    {
      res.status(200).json({PastEndeavors});
 
    }
}) 

const add = asyncHandler(async (req, res) => {
try {
    const {title,supervisorname,membersname,description,inyear,url} = req.body
    const pastendeavor = await PastEndeavor.create({
      title,supervisorname,membersname,description,inyear,url
      });
      
      if(pastendeavor)
      {
        res.status(200).json({ 'message': "Success!" });

      }
} catch (err) {
    console.log(err)
}
})
  
//delete PastEndeavor
const deletePastEndeavor=asyncHandler(async(req,res)=>{
  try {
    const {id}=req.params
   const pastendeavor = await PastEndeavor.findByIdAndRemove(id)
   if(pastendeavor) 
   res.json({ 'message': "Deleted!" })
  } catch (err) {
    console.log(err)
  }
})

module.exports = {get,add,deletePastEndeavor};

