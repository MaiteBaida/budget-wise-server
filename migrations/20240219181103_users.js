/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("users", function (table) {
    table.dropColumn("token");
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", function (table) {
    table.string("token").unique();
  });
};
