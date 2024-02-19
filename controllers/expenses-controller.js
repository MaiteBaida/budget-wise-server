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
    const { name, budget, frequency, type } = req.body;

    if (!name || !budget || !type) {
      return res.status(400).json({ message: "Must fill in all fields" });
    }

    const newExpense = {
      name,
      budget,
      frequency,
      type,
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

    const { name, budget, frequency, type } = req.body;

    const existingExpense = await knex("expenses").where("id", id).first();

    if (!existingExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (!name || !budget || !type) {
      return res
        .status(400)
        .json({ message: "Missing properties in the request body" });
    }

    const existingUser = await knex("users")
      .where("id", existingExpense.user_id)
      .first();

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (isNaN(budget)) {
      return res.status(400).json({ message: "Budget must be a number" });
    }

    await knex("expenses").where("id", id).update({
      name,
      budget,
      frequency,
      type,
    });

    const updatedExpense = await knex("expenses").where("id", id).first();

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Error editing expense:", error);
    res.status(500).json({ message: "Error editing expense", error });
  }
};

module.exports = { userExpenses, addExpense, editExpense };
