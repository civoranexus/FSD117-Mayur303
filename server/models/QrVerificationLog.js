const mongoose = require("mongoose");

const qrVerificationLogSchema = new mongoose.Schema(
  {
    verifierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    verifierUsername: {
      type: String, // 👈 ADD THIS
    },
    productName: String,
    qrToken: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("QrVerificationLog", qrVerificationLogSchema);


