const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expenses-controller");
const { authorize } = require("../middlewares/authorization");

router
  .get("/:userid/expenses", authorize, expensesController.userExpenses)
  .post("/:userid/expenses", authorize, expensesController.addExpense)
  .put("/expenses/:id", authorize, expensesController.addExpense);

module.exports = router;
