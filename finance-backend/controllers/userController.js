const User = require("../models/User");

// Get all users
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Update user status
exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(user);
};