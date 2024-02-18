const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//get list of users
// const fetchUsersList = async (_req, res) => {
//   try {
//     const usersList = await knex.select().from('users');
//     res.status(200).json(usersList);
//     } catch (error) {
//         res.status(400).json({ message: 'Error retrieving users', error });
//     }
// }

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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const addUser = async (req, res) => {
    const { username, email, password, first_name, last_name } = req.body;

    if (!username || !email || !password || !first_name || !last_name) {
        return res.status(400).json({
            message: 'All fields are required',
        })
    }
    if (!emailRegex.test(email)) { 
        return res.status(400).json({
            message: 'Invalid Email',
        })
    } 
    try {
      const hashedPassword = bcrypt.hashSync(password);
      const result = await knex('users').insert({
          username, 
          email, 
          password: hashedPassword, 
          first_name, 
          last_name,
      })

      const newUserId = result[0];
      const createdUser = await knex('users').where({ id: newUserId }).first();

      res.status(201).json({
          message: 'User created successfully',
          user: createdUser,
      })

    } catch (error) {
        res.status(500).json({
            message: `Unable to create new user: ${error}`,
        })
    }
}

//user loggin confirmation
const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await knex('users').where({ username: username }).first();
  
    if(!user || password !== user.password) {
      res.status(401).json({message:'Unable to login'});
    }

    res.status(200).json({
      message: 'User logged in successfully', 
      token
      })

  } catch (error) {
    res.status(401).json({message:'Unable to login'});
  }
}

// const loginUser = async (req, res, next) => {
//   const { username, password } = req.body;
//   const { authorization } = req.headers;

//   try {
//     // Attempt to verify the JWT token
//     const payload = jwt.verify(authorization.split(' ')[1], JWT_KEY);
//     req.user = payload; // Attach user information to the request object
//   } catch(err) {
//     return res.status(401).json("Invalid JWT");
//   }

//   try {
//     // Attempt to find the user in the database
//     const user = await knex('users').where({ username }).first();
  
//     // If the user doesn't exist or the password is incorrect, deny access
//     if (!user || password !== user.password) {
//       return res.status(401).json({ message: 'Unable to login' });
//     }

//     // Login successful, return a response with a success message and the token
//     res.status(200).json({
//       message: 'User logged in successfully',
//       token: authorization.split(' ')[1] // Return the same token
//     });
//   } catch (error) {
//     // If an error occurs during the login process, return an error response
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

module.exports = { fetchUser, addUser, loginUser };