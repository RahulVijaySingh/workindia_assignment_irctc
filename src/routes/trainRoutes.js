const express = require("express");
const { addTrain } = require("../controllers/trainController");
const { verifyAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add", verifyAdmin, addTrain); // Only admin can add trains

module.exports = router;
