const Record = require("../models/Record");

// CREATE
exports.createRecord = async (req, res) => {
  try {
    const { amount, type } = req.body;

    // Calculate current balance
    const income = await Record.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const expense = await Record.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalIncome = income[0]?.total || 0;
    const totalExpense = expense[0]?.total || 0;

    const currentBalance = totalIncome - totalExpense;

    // 🚨 VALIDATION
    if (type === "expense" && amount > currentBalance) {
      return res.status(400).json({
        message: "Insufficient balance! Cannot add this expense."
      });
    }

    const record = await Record.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(record);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL (with filters)
exports.getRecords = async (req, res) => {
  const { type, category } = req.query;

  let filter = {};

  if (type) filter.type = type;
  if (category) filter.category = category;

  const records = await Record.find(filter);
  res.json(records);
};

// UPDATE
exports.updateRecord = async (req, res) => {
  const record = await Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(record);
};

// DELETE
exports.deleteRecord = async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ message: "Record deleted" });
};