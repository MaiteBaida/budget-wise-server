const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expenses-controller");
const entriesController = require("../controllers/entries-controller");
const { authorize } = require("../middlewares/authorization");

router
  .get("/", authorize, expensesController.userExpenses)
  .post("/", authorize, expensesController.addExpense)
  .put("/:id", authorize, expensesController.editExpense)
  .delete("/:id", authorize, expensesController.deleteExpense)
  .get("/entries", authorize, entriesController.expensesEntries)
  .post("/entries", authorize, entriesController.addEntry)
  .put("/entries/:id", authorize, entriesController.editEntry)
  .delete("/entries/:id", authorize, entriesController.editEntry);

module.exports = router;
