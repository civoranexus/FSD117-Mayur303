// const adminRoutes = require("./routes/adminRoutes");
// const app = require("./app");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();

// // Connect Database
// connectDB();

// const PORT = process.env.PORT || 5000;

// // app.use("/api/admin", adminRoutes);


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const testRoutes = require("./routes/testRoutes");

// app.use("/api", testRoutes);


const express = require("express");
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const qrRoutes = require("./routes/qrRoutes");
app.use("/api/qr", qrRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);



