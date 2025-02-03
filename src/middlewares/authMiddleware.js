const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];
  console.log(process.env.JWT_SECRET);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next(); // ✅ Call next() to proceed to the booking controller
  });
};

const verifyAdmin = (req, res, next) => {
  console.log("verifyAdmin middleware triggered");

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("Authorization token missing");
    return res.status(401).json({ error: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Invalid token");
      return res.status(403).json({ error: "Invalid token" });
    }

    if (decoded.role !== "admin") {
      console.log("User is not an admin");
      return res.status(403).json({ error: "Access Denied! Admins only." });
    }

    req.user = decoded;
    next(); // ✅ Continue if user is admin
  });
};

// 🔹 New: Secure Admin Routes with API Key
const verifyAdminWithAPIKey = (req, res, next) => {
  console.log("verifyAdminWithAPIKey middleware triggered");

  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    console.log("Invalid or missing API key");
    return res.status(403).json({ error: "Invalid or missing API key" });
  }

  next(); // ✅ Continue if API key is correct
};

// ✅ Export functions at the end
module.exports = { verifyUser, verifyAdmin, verifyAdminWithAPIKey };
