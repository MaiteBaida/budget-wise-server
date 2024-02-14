const express = require('express');
const router = express.Router();
const userController = require ('../controllers/users-controller')

router
    .get('/:id', userController.fetchUser)
    .get('/:id/expenses', userController.userExpenses)

module.exports = router;