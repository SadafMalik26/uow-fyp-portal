
const express = require("express");
var multer = require('multer');


const {add,list,myProject,count,ongoing,update } = require("../controllers/ProjectController");

const verifyToken = require("../middleware/tokenHandling");

const router = express.Router();


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

// Define upload rules for each field
const uploadFields = [
    { name: 'requirements', maxCount: 1 },
    { name: 'defense', maxCount: 1 },
    { name: 'proposal', maxCount: 1 }
  ];

router.post("/",  upload.fields(uploadFields), add);

router.put("/",   upload.single('selectedFile'), update);

router.get("/count", count);

router.get("/", list);

router.get("/my", myProject);

router.get("/ongoing", ongoing);

module.exports = router;
