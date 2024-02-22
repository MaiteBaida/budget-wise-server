const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expenses-controller");
const entriesController = require("../controllers/entries-controller");
const { authorize } = require("../middlewares/authorization");

router
  .get("/", authorize, expensesController.userExpenses)
  .post("/", authorize, expensesController.addExpense)
  .get("/:id", authorize, expensesController.fetchExpense)
  .put("/:id", authorize, expensesController.editExpense)
  .delete("/:id", authorize, expensesController.deleteExpense)
  .get("/:id/entries", authorize, entriesController.expensesEntries)
  .post("/:id/entries", authorize, entriesController.addEntry)
  .get("/:id/entries/:entryid", authorize, entriesController.fetchEntry)
  .put("/:id/entries/:entryid", authorize, entriesController.editEntry)
  .delete("/:id/entries/:entryid", authorize, entriesController.deleteEntry);

module.exports = router;
