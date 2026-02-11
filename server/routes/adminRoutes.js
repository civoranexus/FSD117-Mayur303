const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const QrGenerationLog = require("../models/QrGenerationLog");
const QrVerificationLog = require("../models/QrVerificationLog");

const {
  getAllUsers,
  getAllQRCodes,
  getScanLogs,
} = require("../controllers/adminController");

// Existing admin routes
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.get("/qrs", protect, authorizeRoles("admin"), getAllQRCodes);
router.get("/scans", protect, authorizeRoles("admin"), getScanLogs);

// NEW LOG ROUTES
router.get("/qr-generation-logs", protect, adminOnly, async (req, res) => {
  const logs = await QrGenerationLog.find().sort({ createdAt: -1 });
  res.json(logs);
});

router.get("/qr-verification-logs", protect, adminOnly, async (req, res) => {
  const logs = await QrVerificationLog.find().sort({ verifiedAt: -1 });
  res.json(logs);
});

module.exports = router;

