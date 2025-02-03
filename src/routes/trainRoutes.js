const express = require("express");
const { addTrain } = require("../controllers/trainController");
const { verifyAdmin } = require("../middlewares/authMiddleware");
const { getTrains } = require("../controllers/trainController");
const { verifyAdminWithAPIKey } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add", verifyAdmin, verifyAdminWithAPIKey, addTrain); // Only admin can add trains
router.get("/search", getTrains);

module.exports = router;
