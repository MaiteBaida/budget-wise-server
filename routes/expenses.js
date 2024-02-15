const express = require('express');
const router = express.Router();
const expensesController = require ('../controllers/expenses-controller');


router
    .get('/:id/expenses', expensesController.userExpenses)
    .post('/:id/addexpense', expensesController.addExpense);

module.exports = router;