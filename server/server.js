const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");


dotenv.config();

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.use("/api/admin", adminRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
