const knex = require('knex')(require('../knexfile'));

//get user by id function
const fetchUser = async (req, res) => {
    try {
      const userId = await knex('users')
        .where({ id: req.params.id });
  
      if (userId.length === 0) {
        return res.status(404).json({
          message: `User with ID ${req.params.id} not found`
        });
      }
  
      const userData = userId[0];
      res.json(userData);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve data for user with ID ${req.params.id}`,
      });
    }
}

const userExpenses = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId)
        const expenses = await knex('expenses')
            .join('users', 'expenses.user_id', '=', 'users.id')
            .where({ 'expenses.user_id' : userId })
            .select('*');

        res.json(expenses);
    } catch (error) {
        res.status(500).json({
            message: `Error retrieving expenses for user: ${error}`,
        });
    }
}

module.exports = { fetchUser, userExpenses };