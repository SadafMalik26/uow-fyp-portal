
const express = require("express");
 
const {get,add, deletePastEndeavor} = require("../controllers/PastEndeavorController");

const verifyToken = require("../middleware/tokenHandling");

const router = express.Router();

router.get("/", get);
 router.post("/", add);
 router.delete("/:id", deletePastEndeavor);

module.exports = router;
 