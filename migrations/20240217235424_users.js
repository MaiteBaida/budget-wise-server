//version 2
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("username").notNullable().alter();
    table.string("email").notNullable().unique().alter();
    table.string("password").notNullable().alter();
    table.string("first_name").notNullable().alter();
    table.string("last_name").notNullable().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("username").alter();
    table.string("email").unique().alter();
    table.string("password").alter();
    table.string("first_name").alter();
    table.string("last_name").alter();
  });
};
