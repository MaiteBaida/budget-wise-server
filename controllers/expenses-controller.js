const knex = require("knex")(require("../knexfile"));

//GET list of user's expenses
// const userExpenses = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const expenses = await knex("expenses").where("user_id", userId);

//     const entriesByExpene = await knex("entries").where("expense_id", userId);

//     res.json(expenses);
//   } catch (error) {
//     res.status(500).json({
//       message: `Error retrieving expenses for user: ${error}`,
//     });
//   }
// };

const userExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await knex("expenses").select().where("user_id", userId);

    for (const expense of expenses) {
      const entries = await knex("entries")
        .select()
        .where("expense_id", expense.id);
      expense.entries = entries;
    }

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

    if (isNaN(budget)) {
      return res.status(400).json({ message: "Budget must be a number" });
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
    res.status(500).json({ message: "Failed to create expense" });
  }
};

//get expense by ID

const fetchExpense = async (req, res) => {
  try {
    const expenseId = await knex("expenses")
      .select()
      .where({ id: req.params.id });

    if (expenseId.length === 0) {
      return res.status(404).json({
        message: `Expense with ID ${req.params.id} not found`,
      });
    }

    const expenseData = expenseId[0];
    res.json(expenseData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve data for expense with ID ${req.params.id}`,
    });
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

    if (isNaN(budget)) {
      return res.status(400).json({ message: "Budget must be a number" });
    }

    const updateObject = {
      name,
      budget,
      type,
    };

    if (frequency) {
      updateObject.frequency = frequency;
    }

    await knex("expenses").where("id", id).update(updateObject);

    const updatedExpense = await knex("expenses").where("id", id).first();

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Error editing expense:", error);
    res.status(500).json({ message: "Error editing expense", error });
  }
};

//delete expense
const deleteExpense = async (req, res) => {
  try {
    const rowsDeleted = await knex("expenses")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete expense",
    });
  }
};

module.exports = {
  userExpenses,
  addExpense,
  fetchExpense,
  editExpense,
  deleteExpense,
};
