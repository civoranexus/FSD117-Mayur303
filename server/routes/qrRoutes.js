const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { generateQRCode } = require("../controllers/qrController");

const router = express.Router();

router.post(
  "/generate",
  protect,
  authorizeRoles("vendor", "admin"),
  generateQRCode
);

module.exports = router;
