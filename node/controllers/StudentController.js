const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel");

const type = 'Student'
var fs = require('fs');


const count = asyncHandler(async (req, res) => {

  const studentCount = await User.find({ type }).count()
  res.status(200).json({ studentCount });

})


const list = asyncHandler(async (req, res) => {

  const students = await User.find({ type }).sort({ '_id': -1 })

  res.status(200).json({ students });

})

const add = asyncHandler(async (req, res) => {
  
  try {
  const { email, username, password } = req.body


    const cover = {
      data: fs.readFileSync((process.cwd() + '/uploads/' + req.file.filename)),
      contentType: 'image/jpeg'
    }
    const user = await User.create({
      email, username, password, type, cover
    });

    if (user) {

      res.status(200).json({ 'message': "Succussfully Added" });

    } else
      throw new Error("error");

  } catch (e) {
    res.status(500).json({ 'message': 'Email Already Taken' });

  }


})

module.exports = { count, list, add };
