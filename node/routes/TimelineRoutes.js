const express = require("express");

const {add,get,edit,deleteTimeline}  = require("../controllers/TimelineController");

const verifyToken = require("../middleware/tokenHandling");

const router = express.Router();
 
router.post("/", add);
router.get("/", get);
router.put("/", edit);

router.delete("/:id", deleteTimeline);

module.exports = router;
