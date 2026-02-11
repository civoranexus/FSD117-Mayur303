
const QrGenerationLog = require("../models/QrGenerationLog");

const QRCodeModel = require("../models/QRCode");
const { generateToken, generateQRImage } = require("../utils/generateQR");

exports.generateQRCode = async (req, res) => {
  try {
    

    const { productName, batchNumber } = req.body;

    const token = generateToken();
    const qrImage = await generateQRImage(token);


    const qrData = await QRCodeModel.create({
      token,
      productName,
      batchNumber,
      createdBy: req.user.id,
    });


    await QrGenerationLog.create({
      vendorId: req.user.id,
      vendorUsername: req.user.name || "UNKNOWN",
       productName,
       batchNumber,
       token,
    });


    res.status(201).json({
      message: "QR Code generated successfully",
      qrCode: qrData,
      qrImage,
    });

    
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


