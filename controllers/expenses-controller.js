const knex = require("knex")(require("../knexfile"));

//GET list of user's expenses
const userExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await knex("expenses").where("user_id", userId);

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving expenses for user: ${error}`,
    });
  }
};

//user add new expense
const addExpense = async (req, res) => {
  try {
    const { name, estimated_amount, paid_amount, frequency, type, notes } =
      req.body;

    if (!name || !estimated_amount || !frequency || !type) {
      return res.status(400).json({ message: "Must fill in all fields" });
    }

    const newExpense = {
      name,
      estimated_amount,
      paid_amount,
      frequency,
      type,
      notes,
      user_id: req.user.id,
    };

    const [expenseId] = await knex("expenses").insert(newExpense);

    const expense = await knex("expenses").where("id", expenseId).first();

    res.status(201).json({
      message: "Expense created successfully",
      expense: expense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create expense" });
  }
};

//edit expense

const editExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, estimated_amount, paid_amount, frequency, type, notes } =
      req.body;

    const existingExpense = await knex("expenses").where("id", id).first();

    if (!existingExpense) {
      return res.status(404).json({ message: "Expense ID not found" });
    }

    if (!name || !estimated_amount || !frequency || !type) {
      return res
        .status(400)
        .json({ message: "Missing properties in the request body" });
    }

    const existingUser = await knex("users").where("id", user_id).first();

    if (!existingUser) {
      return res.status(400).json({ message: "User ID does not exist" });
    }

    if (isNaN(estimated_amount) || isNaN(paid_amount)) {
      return res
        .status(400)
        .json({ message: "Estimated amount and paid amount must be a number" });
    }

    const newExpense = {
      name,
      estimated_amount,
      paid_amount,
      frequency,
      type,
      notes,
      user_id,
    };

    const updatedExpense = await knex("expenses").where("id", id).first();

    res.status(200).json(updatedExpense);
  } catch {
    console.error("Error editing expense:", error);
    res.status(500).json({ message: "Error editing expense", error });
  }
};

module.exports = { userExpenses, addExpense, editExpense };
