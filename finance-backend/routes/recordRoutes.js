const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");

// Admin only
router.post("/", auth, role("admin"), createRecord);

// Analyst + Admin
router.get("/", auth, role("admin", "analyst"), getRecords);

// Admin only
router.put("/:id", auth, role("admin"), updateRecord);
router.delete("/:id", auth, role("admin"), deleteRecord);

module.exports = router;