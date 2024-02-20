const knex = require("knex")(require("../knexfile"));

//get a list of all entries from a expense
const expensesEntries = async (req, res) => {
  try {
    const expenseId = req.expense.id;
    const entries = await knex("entries").where("expenses_id", expenseId);

    res.json(entries);
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving entries for expenses: ${error}`,
    });
  }
};

//add a new entry
const addEntry = async (req, res) => {
  try {
    const { amount, notes } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Must have an amount" });
    }

    if (isNaN(amount)) {
      return res.status(400).json({ message: "Amount must be a number" });
    }

    const newEntry = {
      amount,
      notes,
      timestamp,
      expense_id: req.expense.id,
      user_id: req.user.id,
    };

    const [entryId] = await knex("entries").insert(newEntry);
    //timestamp ?
    const entry = await knex("entries").where("id", entryId).first();

    res.status(201).json({
      message: "Entry created successfully",
      expense: expense,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create entry" });
  }
};

//edit entry
const editEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const { amount, notes } = req.body;

    const existingEntry = await knex("entries").where("id", id).first();

    if (!existingEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    if (!amount) {
      return res
        .status(400)
        .json({ message: "Missing properties in the request body" });
    }

    const existingExpense = await knex("expenses")
      .where("id", existingEntry.expense_id)
      .first();

    if (!existingExpense) {
      return res.status(400).json({ message: "Expense does not exist" });
    }

    if (isNaN(amount)) {
      return res.status(400).json({ message: "Amount must be a number" });
    }

    await knex("entries").where("id", id).update({
      amount,
      notes,
    });

    const updatedEntry = await knex("entry").where("id", id).first();

    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error("Error editing entry:", error);
    res.status(500).json({ message: "Error editing entry", error });
  }
};

//delete entry
const deleteEntry = async (req, res) => {
  try {
    const rowsDeleted = await knex("entries")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete entry",
    });
  }
};

module.exports = { expensesEntries, addEntry, editEntry, deleteEntry };
