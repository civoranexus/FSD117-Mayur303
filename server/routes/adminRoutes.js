const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  getAllQRCodes,
  getScanLogs,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.get("/qrs", protect, authorizeRoles("admin"), getAllQRCodes);
router.get("/scans", protect, authorizeRoles("admin"), getScanLogs);

module.exports = router;
