const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

// get list of users
// const fetchUsersList = async (_req, res) => {
//   try {
//     const usersList = await knex.select().from("users");
//     res.status(200).json(usersList);
//   } catch (error) {
//     res.status(400).json({ message: "Error retrieving users", error });
//   }
// };

//get user by id function (token)
const fetchUser = async (req, res) => {
  try {
    const userData = await knex("users")
      .select()
      .where({ id: req.user.id })
      .first();

    const userTotalEntries = await knex("entries")
      .sum("value as user_total")
      .where("user_id", req.user.id)
      .first()
      .then((res) => {
        return res.user_total;
      });

    const userTotalBudget = await knex("expenses")
      .sum("budget as user_total")
      .where("user_id", req.user.id)
      .first()
      .then((res) => {
        return res.user_total;
      });

    if (!userData) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
      });
    }

    res.json({ ...userData, userTotalEntries, userTotalBudget });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Unable to retrieve data for user with ID ${req.params.id}`,
    });
  }
};

//add new user function

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const addUser = async (req, res) => {
  const { username, email, password, first_name, last_name } = req.body;

  if (!username || !email || !password || !first_name || !last_name) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid Email",
    });
  }
  try {
    const hashedPassword = bcrypt.hashSync(password);
    const result = await knex("users").insert({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
    });

    const newUserId = result[0];
    const createdUser = await knex("users").where({ id: newUserId }).first();

    const token = jwt.sign(
      {
        first_name: createdUser.first_name,
        last_name: createdUser.last_name,
        email: createdUser.email,
        username: username,
        id: createdUser.id,
      },
      JWT_KEY
    );

    res.status(201).json({
      message: "User created successfully",
      user: createdUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

//user loggin confirmation
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex("users").where({ username: username }).first();

    if (!user) {
      res.status(401).json({ message: "Unable to login" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Unable to login" });
    }

    const token = jwt.sign(
      {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: username,
        id: user.id,
      },
      JWT_KEY
    );

    return res.status(200).json({
      message: "User logged in",
      token,
      user,
    });
  } catch (error) {
    console.error("Error signing JWT:", error);
    res.status(401).json({ message: "Unable to login" });
  }
};

module.exports = { fetchUser, addUser, loginUser };
