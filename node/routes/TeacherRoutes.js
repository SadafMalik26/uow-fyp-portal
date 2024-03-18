const express = require("express");
var multer = require('multer');

const { count,list,add,qualification,addSlot,slots,editSlot,mySlots,slotsCount } = require("../controllers/TeacherController");

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

router.post("/", upload.single('selectedImage'),add);
router.post("/slots",  addSlot);

router.get("/count", count);
router.get("/slots/:id", slots);
router.get("/slots/count/:id", slotsCount);
router.get("/slots", mySlots);

router.get("/", list);

router.get("/qualification/:id", qualification);

router.put("/slots",upload.single('proposal'),editSlot);


module.exports = router;
