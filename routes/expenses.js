const express = require('express');
const router = express.Router();
const expensesController = require ('../controllers/expenses-controller');


router
    .get('/:userid/expenses', expensesController.userExpenses)
    .post('/:userid/expenses', expensesController.addExpense)
    .put('/expenses/:id', expensesController.addExpense)

module.exports = router;