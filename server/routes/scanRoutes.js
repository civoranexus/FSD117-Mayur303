const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { verifyQRCode } = require("../controllers/scanController");

const router = express.Router();

// verifier / admin can scan
router.post(
  "/verify",
  protect,
  authorizeRoles("verifier", "admin"),
  verifyQRCode
);

module.exports = router;

