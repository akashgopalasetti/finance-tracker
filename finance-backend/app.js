const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://finance-tracker-3ijh.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// body parser
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/records", require("./routes/recordRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

module.exports = app;
