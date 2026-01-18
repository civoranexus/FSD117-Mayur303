const express = require("express");
const router = express.Router();

// TEMPORARY TEST HANDLER (to stop crash)
router.post("/generate", (req, res) => {
  res.json({ message: "QR generate route working" });
});

module.exports = router;

