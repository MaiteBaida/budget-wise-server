const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expenses-controller");
const entriesController = require("../controllers/entries-controller");
const { authorize } = require("../middlewares/authorization");

router
  .get("/", authorize, entriesController.expensesEntries)
  .post("/", authorize, entriesController.addEntry)
  .put("/:id", authorize, entriesController.editEntry)
  .delete("/:id", authorize, entriesController.editEntry);

module.exports = router;
