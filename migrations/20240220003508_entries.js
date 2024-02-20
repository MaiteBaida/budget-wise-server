exports.up = function (knex) {
  return knex.schema.alterTable("entries", function (table) {
    // Modify the existing 'timestamp' column to accept big integer values
    table.bigInteger("timestamp").notNullable().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("entries", function (table) {
    // Revert the 'timestamp' column to its original type (if needed)
    table.timestamp("timestamp").alter();
  });
};
