const express = require("express");
const {
  getAllUsers,
  getAllQRCodes,
} = require("../controllers/adminController");
const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/qrcodes", protect, adminOnly, getAllQRCodes);

module.exports = router;

