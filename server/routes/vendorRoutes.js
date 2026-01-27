const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { getMyQRCodes } = require("../controllers/vendorController");

const router = express.Router();

router.get(
  "/my-qrs",
  protect,
  authorizeRoles("vendor", "admin"),
  getMyQRCodes
);

module.exports = router;
