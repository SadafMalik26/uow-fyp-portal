
const express = require("express");

const {add,list,percentage } = require("../controllers/MeetingController");

const verifyToken = require("../middleware/tokenHandling");

const router = express.Router();

router.post("/", add);
router.get("/", list);
router.get("/percentage/:id", percentage);

module.exports = router;
