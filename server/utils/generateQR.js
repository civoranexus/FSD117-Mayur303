const crypto = require("crypto");
const QRCode = require("qrcode");

const generateToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

const generateQRImage = async (token) => {
  return await QRCode.toDataURL(token);
};

module.exports = { generateToken, generateQRImage };
