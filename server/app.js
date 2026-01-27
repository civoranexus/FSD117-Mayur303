const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("VendorVerify Backend is running");
});

module.exports = app;

const testRoutes = require("./routes/testRoutes");

app.use("/api/test", testRoutes);

const qrRoutes = require("./routes/qrRoutes");

app.use("/api/qr", qrRoutes);

const scanRoutes = require("./routes/scanRoutes");

app.use("/api/scan", scanRoutes);

const vendorRoutes = require("./routes/vendorRoutes");

app.use("/api/vendor", vendorRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
