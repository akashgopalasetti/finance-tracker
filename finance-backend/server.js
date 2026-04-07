const app = require("./app");
const connectDB = require("./config/db");
const cors = require("cors");

app.use(cors({
  origin: "https://finance-tracker-21-kamz.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
require("dotenv").config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
