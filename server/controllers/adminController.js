const User = require("../models/User");
const QRCode = require("../models/QRCode");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllQRCodes = async (req, res) => {
  try {
    const qrs = await QRCode.find().populate("vendor", "name email");
    res.json(qrs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAllQRCodes,
};

