const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const QRCode = require("../models/QRCode");

exports.getAllQRCodes = async (req, res) => {
  try {
    const qrs = await QRCode.find().populate("createdBy", "email role");
    res.json(qrs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const ScanLog = require("../models/ScanLog");

exports.getScanLogs = async (req, res) => {
  try {
    const logs = await ScanLog.find()
      .populate("qrCode")
      .populate("scannedBy", "email role");

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
