const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const usersRoutes = require('./routes/users');
const expensesRoutes = require('./routes/expenses');

app.use(express.json());
app.use(cors());

app.route('/')
    .get((_req, res) => {
        res.json('Welcome to / for BudgetWise');
})

app.use('/user', usersRoutes);

app.use('/expenses', expensesRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})