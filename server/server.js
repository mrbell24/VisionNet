const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({
    origin: "*"
}));

app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to VisionNest Backend API 🚀"
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});