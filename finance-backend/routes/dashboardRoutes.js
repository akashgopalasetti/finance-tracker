const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getSummary } = require("../controllers/dashboardController");

router.get("/", auth, role("admin", "analyst"), getSummary);

module.exports = router;