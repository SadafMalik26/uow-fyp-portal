const express = require("express");

const {add,list,without,attendees } = require("../controllers/GroupController");

const verifyToken = require("../middleware/tokenHandling");

const router = express.Router();

router.post("/", add);
router.get("/", list);
router.get("/without/", without);
router.get("/attendees/:id", attendees);

module.exports = router;
