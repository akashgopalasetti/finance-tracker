const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  getUsers,
  updateStatus,
} = require("../controllers/userController");

router.get("/", auth, role("admin"), getUsers);
router.put("/:id/status", auth, role("admin"), updateStatus);

module.exports = router;