const express = require("express");
var multer = require('multer');


const { count,list,add} = require("../controllers/StudentController");

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

router.get("/count", count);

router.get("/", list);

router.post("/",upload.single('selectedImage'), add);


module.exports = router;
