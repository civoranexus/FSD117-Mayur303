const mongoose = require("mongoose");

const qrGenerationLogSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendorUsername: {
      type: String, // 👈 ADD THIS
    },
    productName: String,
    batchNumber: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("QrGenerationLog", qrGenerationLogSchema);


