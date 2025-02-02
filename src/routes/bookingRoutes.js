const express = require("express");
const { bookSeat } = require("../controllers/bookingController"); // ✅ Ensure correct import
const { verifyUser } = require("../middlewares/authMiddleware");

const router = express.Router();
console.log("bookSeat:", bookSeat);
router.post("/book", verifyUser, bookSeat); // ✅ Ensure `bookSeat` is defined

module.exports = router;
