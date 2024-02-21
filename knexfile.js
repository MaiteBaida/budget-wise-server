require("dotenv").config();
/**
 *no @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_LOCAL_NAME,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
    charset: "utf8",
  },
};
