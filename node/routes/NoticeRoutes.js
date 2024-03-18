
const express = require("express");

const {get,add,deleteNotice} = require("../controllers/NoticeController");

const verifyToken = require("../middleware/tokenHandling");

const router = express.Router();

router.get("/", get);
router.post("/", add);
router.delete("/:id", deleteNotice);
 
module.exports = router;
