const QRCode = require("../models/QRCode");
const ScanLog = require("../models/ScanLog");

exports.verifyQRCode = async (req, res) => {
  try {
    const { token } = req.body;

    // find QR
    const qr = await QRCode.findOne({ token });

    // fake QR
    if (!qr) {
      await ScanLog.create({
        scannedBy: req.user.id,
        result: "invalid",
        ipAddress: req.ip,
      });

      return res.status(404).json({ status: "INVALID", message: "Fake QR Code" });
    }

    // already used
    if (qr.status === "used") {
      await ScanLog.create({
        qrCode: qr._id,
        scannedBy: req.user.id,
        result: "used",
        ipAddress: req.ip,
      });

      return res.json({
        status: "USED",
        message: "QR Code already used",
      });
    }

    // valid scan (first time)
    qr.status = "used";
    await qr.save();

    await ScanLog.create({
      qrCode: qr._id,
      scannedBy: req.user.id,
      result: "valid",
      ipAddress: req.ip,
    });

    res.json({
      status: "VALID",
      productName: qr.productName,
      batchNumber: qr.batchNumber,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
