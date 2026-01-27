const express = require("express");
const router = express.Router();

const { verifyQR } = require("../controllers/verifyController");
const { protect, verifierOnly } = require("../middleware/authMiddleware");

router.post("/verify", protect, verifierOnly, verifyQR);

module.exports = router;
