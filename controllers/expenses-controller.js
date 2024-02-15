const knex = require('knex')(require('../knexfile'));

//list of user's expenses
const userExpenses = async (req, res) => {
    try {
        const userId = req.params.userid;
        console.log(userId)
        const expenses = await knex('expenses')
            .join('users', 'expenses.user_id', '=', 'users.id')
            .select('expenses.*', 'users.username', 'users.email', 'users.first_name', 'users.last_name')
            .where('expenses.user_id', userId);

        res.json(expenses);
    } catch (error) {
        res.status(500).json({
            message: `Error retrieving expenses for user: ${error}`,
        });
    }
}

//user add new expense
const addExpense = async (req, res) => {
    try {
        console.log('Received expense data:', req.body);
        const { name, estimated_amount, paid_amount, frequency, type, notes } = req.body;


        // if(!name || !estimated_amount || !frequency || !type) {
        //     return res.status(400).json({message:'Must fill in all fields'});
        // }

        const newExpense = {
            name,
            estimated_amount,
            paid_amount,
            frequency,
            type,
            notes,
            user_id: req.params.userid 
        }

        console.log('Constructed new expense:', newExpense);

        const [insertedExpenseId] = await knex('expenses').insert(newExpense);

        const insertedExpense = await knex('expenses').where('id', insertedExpenseId).first();

        console.log('Inserted expense into database:', insertedExpense);

        const expenseWithUser = { ...insertedExpense, ...req.user };

        // console.log(expenseWithUser)

        res.status(201).json({ message: 'Expense created successfully', expense:  expenseWithUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create expense' });
    }
}

module.exports = { userExpenses, addExpense };

   