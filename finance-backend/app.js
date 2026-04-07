const express = require("express");
const cors = require("cors");

const app = express();

/* =========================
   ✅ CORS CONFIG (FINAL)
========================= */

const allowedOrigins = [
  "http://localhost:3000",
  "https://finance-tracker-21-kamz.onrender.com",
  "https://finance-tracker-3ijh.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow Postman or server-to-server requests (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

/* =========================
   ✅ MIDDLEWARES
========================= */

app.use(express.json());

/* =========================
   ✅ ROUTES
========================= */

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/records", require("./routes/recordRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

/* =========================
   ✅ ROOT ROUTE (OPTIONAL)
========================= */

app.get("/", (req, res) => {
  res.send("Finance Backend API Running 🚀");
});

/* =========================
   ✅ ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error(err.message);

  if (err.message.includes("CORS")) {
    return res.status(403).json({ message: err.message });
  }

  res.status(500).json({ message: "Server Error" });
});

/* =========================
   ✅ EXPORT
========================= */

module.exports = app;
