const express = require("express");

const { loginUser, authUser, logoutUser,allUsers} = require("../controllers/AdminController");

const verifyToken = require("../middleware/tokenHandling");

const router = express.Router();


router.post("/login", loginUser);

router.get("/auth", authUser);

router.get("/logout",verifyToken, logoutUser);


router.get("/all", allUsers);


module.exports = router;
