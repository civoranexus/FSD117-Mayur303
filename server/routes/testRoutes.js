const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get(
  "/vendor",
  protect,
  authorizeRoles("vendor", "admin"),
  (req, res) => {
    res.json({ message: "Vendor access granted" });
  }
);

module.exports = router;
