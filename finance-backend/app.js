const express = require("express");


const app = express();
const cors = require("cors");

// ✅ MUST be before routes
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://finance-tracker-3ijh.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/records", require("./routes/recordRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

module.exports = app;
