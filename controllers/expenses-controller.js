const knex = require('knex')(require('../knexfile'));

//expenses list of a specific user
const userExpenses = async (req, res) => {
    try {
        const userId = req.params.id;
        const expenses = await knex('expenses')
            .where({ user_id: userId })
            .select('*');

        res.json(expenses);
    } catch (error) {
        res.status(500).json({
            message: `Error retrieving expenses for user: ${error}`,
        });
    }
}

module.exports = { userExpenses };