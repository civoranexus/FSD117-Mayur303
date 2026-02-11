// Verify QR Code
const verifyQR = async (req, res) => {
  try {
    const { qrData } = req.body;

    if (!qrData) {
      return res.status(400).json({ message: "QR data is required" });
    }

    // Convert QR string back to object
    const parsedData = JSON.parse(qrData);

    res.json({
      message: "QR verified successfully",
      data: parsedData,
      status: "VALID"
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid or corrupted QR",
      status: "INVALID"
    });
  }
};

module.exports = {
  verifyQR
};
