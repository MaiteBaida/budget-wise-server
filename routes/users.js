const express = require('express');
const router = express.Router();
const userController = require ('../controllers/users-controller')

router
    .get('/:id', userController.fetchUser)
    .post('/register', userController.addUser);

module.exports = router;