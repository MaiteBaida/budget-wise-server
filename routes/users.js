const express = require("express");
const router = express.Router();
const userController = require("../controllers/users-controller");
const { authorize } = require("../middlewares/authorization");

router
  .get("/", authorize, userController.fetchUser)
  .post("/register", userController.addUser)
  .post("/login", userController.loginUser);

module.exports = router;
