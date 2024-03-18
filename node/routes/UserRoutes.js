const express = require("express");
var multer = require('multer');

const { loginUser, authUser, logoutUser,allUsers,deleteUser,get,update,pass,notifcation} = require("../controllers/UserController");

const verifyToken = require("../middleware/tokenHandling");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });


const router = express.Router();

router.post("/login", loginUser);

router.get("/auth", authUser);
router.get("/notification", notifcation);

router.get("/logout",verifyToken, logoutUser);


router.get("/all", allUsers);

router.delete("/:id", deleteUser);

router.get("/:id", get);

router.put("/", upload.single('selectedImage'), update);
router.put("/forget",pass);
router.post("/reset",pass);


module.exports = router;
