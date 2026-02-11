const QRCode = require("../models/QRCode");

exports.getMyQRCodes = async (req, res) => {
  try {
    const qrs = await QRCode.find({ createdBy: req.user.id });
    res.json(qrs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
