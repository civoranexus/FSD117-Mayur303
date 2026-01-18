const mongoose = require("mongoose");

const scanLogSchema = new mongoose.Schema(
  {
    qrCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QRCode",
    },
    scannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    result: {
      type: String,
      enum: ["valid", "invalid", "used"],
    },
    ipAddress: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ScanLog", scanLogSchema);
