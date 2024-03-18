const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/TeacherModel");

//Login user
const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields as all are mandatory!");
  }

  const user = await User.findOne({ email });

  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {

    jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    }, process.env.Access_Token, (er, token) => {
      if (er)
        res.send("Cannot Login");

      res.cookie("jwt", token);

      res.status(200).json({ "username": user.username });

    });

  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//auth user
const authUser = asyncHandler(async (req, res) => {

  const token = req.cookies.jwt

  if (!token) {
    res.json({ 'is_login': false })
  }
  else {
    const details = jwt.decode(token)
    const username = details.user.username
    const email = details.user.email
    res.json({ 'is_login': true, username, email })
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



module.exports = { loginUser, authUser, logoutUser, allUsers };
