const express = require("express");
const { bookSeat } = require("../controllers/bookingController"); // ✅ Ensure correct import
const { getUserBookings } = require("../controllers/bookingController");
const { verifyUser } = require("../middlewares/authMiddleware");
const { getAllBookings } = require("../controllers/bookingController");
const { verifyAdmin } = require("../middlewares/authMiddleware");
const { verifyAdminWithAPIKey } = require("../middlewares/authMiddleware");

const router = express.Router();
console.log("bookSeat:", bookSeat);
router.post("/book", verifyUser, bookSeat); // ✅ Ensure `bookSeat` is defined

router.get("/history", verifyUser, getUserBookings);
router.get("/admin/all", verifyAdmin, verifyAdminWithAPIKey, getAllBookings);

module.exports = router;
