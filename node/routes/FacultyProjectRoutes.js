
const express = require("express");
 
const {get,add, deleteFacultyProject} = require("../controllers/FacultyProjectController");

const verifyToken = require("../middleware/tokenHandling");

const router = express.Router();

router.get("/", get);
 router.post("/", add);
 router.delete("/:id", deleteFacultyProject);

module.exports = router;
 