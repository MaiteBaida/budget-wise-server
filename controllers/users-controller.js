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

//add new user function
const addUser = async (req, res) => {
    const { username, email, password, first_name, last_name } = req.body;

    if (!username || !email || !password || !first_name || !last_name) {
        return res.status(400).json({
            message: 'All fields are required',
        })
    }
    if (!email.includes('@' && '.')) { 
        return res.status(400).json({
            message: 'Invalid Email',
        })
    } 
    try {
        const result = await knex('users').insert({
            username, 
            email, 
            password, 
            first_name, 
            last_name,
        })

        const newUserId = result[0];
        const createdUser = await knex('users').where({ id: newUserId }).first();

        res.status(201).json({
            message: 'User created successfully',
            user: createdUser, // Fix typo here
        })

    } catch (error) {
        res.status(500).json({
            message: `Unable to create new user: ${error}`,
        })
    }
}

//expenses list of a specific user
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

module.exports = { fetchUser, addUser, userExpenses };