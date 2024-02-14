const express = require('express');
const router = express.Router();
const expensesController = require ('../controllers/expenses-controller')

router 
.get('/:id', expensesController.userExpenses);

module.exports = router;