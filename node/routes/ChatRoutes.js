const express = require("express");

const {chat,sendMessage} = require("../controllers/ChatController");

const verifyToken = require("../middleware/tokenHandling");

const router = express.Router();

router.get("/:id", chat);

router.post("/send", sendMessage);


module.exports = router;
