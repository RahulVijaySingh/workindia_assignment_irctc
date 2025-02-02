const jwt = require("jsonwebtoken");

exports.verifyAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer <TOKEN>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access Denied! Admins only." });
    }

    next(); // Continue if admin
  } catch (err) {
    return res.status(401).json({ message: "Invalid or missing token" });
  }
};
