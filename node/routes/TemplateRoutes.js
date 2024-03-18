
const express = require("express");
var multer = require('multer');

const {add,get ,update} = require("../controllers/TemplateController");

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

router.post("/",upload.single('value'), add);
router.get("/", get);
router.put("/",upload.single('value'), update);

module.exports = router;
