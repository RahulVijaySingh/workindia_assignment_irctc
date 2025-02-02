const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const trainRoutes = require("./routes/trainRoutes");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
