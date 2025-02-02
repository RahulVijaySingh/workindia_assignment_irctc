const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const trainRoutes = require("./routes/trainRoutes");
const bookingRoutes = require("./routes/bookingRoutes"); // Import booking routes

dotenv.config();
const app = express();
app.use(express.json());

// Debugging: Check if bookingRoutes is loaded
console.log("Registering booking routes...");

app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/bookings", bookingRoutes); // Register booking routes

app.listen(3000, () => console.log("Server running on port 3000"));
