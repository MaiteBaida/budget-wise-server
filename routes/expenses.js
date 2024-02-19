const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expenses-controller");
const { authorize } = require("../middlewares/authorization");

router
  .get("/", authorize, expensesController.userExpenses)
  .post("/", authorize, expensesController.addExpense)
  .put("/:id", authorize, expensesController.editExpense);

module.exports = router;
