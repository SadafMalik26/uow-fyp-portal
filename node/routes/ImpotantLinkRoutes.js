
const express = require("express");

const {get,add} = require("../controllers/ImportantLinkController");

const verifyToken = require("../middleware/tokenHandling");

const router = express.Router();

router.get("/", get);
router.post("/", add);


module.exports = router;
