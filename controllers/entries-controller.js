const knex = require("knex")(require("../knexfile"));

//get a list of all entries from a expense
const expensesEntries = async (req, res) => {
  try {
    const expenseId = req.params.id;
    console.log(expenseId);
    const entries = await knex("entries").where("expense_id", expenseId);

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
    const { value, notes } = req.body;

    if (!value) {
      return res.status(400).json({ message: "Must have an value" });
    }

    if (isNaN(value)) {
      return res.status(400).json({ message: "value must be a number" });
    }

    const timestamp = Date.now();

    const newEntry = {
      value,
      notes,
      timestamp: timestamp,
      expense_id: req.params.id,
      user_id: req.user.id,
    };

    const [entryId] = await knex("entries").insert(newEntry);

    const entry = await knex("entries").where("id", entryId).first();

    res.status(201).json({
      message: "Entry created successfully",
      entry: entry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create entry" });
  }
};

//edit entry
const editEntry = async (req, res) => {
  try {
    const { entryid } = req.params;

    const { value, notes } = req.body;

    const existingEntry = await knex("entries").where("id", entryid).first();

    if (!existingEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    if (!value) {
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

    if (isNaN(value)) {
      return res.status(400).json({ message: "value must be a number" });
    }

    await knex("entries").where("id", entryid).update({
      value,
      notes,
    });

    const updatedEntry = await knex("entries").where("id", entryid).first();

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
      .where({ id: req.params.entryid })
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
