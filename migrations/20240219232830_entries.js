exports.up = function (knex) {
  return knex.schema.createTable("entries", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.integer("expense_id").unsigned().notNullable();
    table.decimal("value", 10, 2).notNullable();
    table.string("notes").nullable();
    table.timestamp("timestamp").defaultTo(knex.fn.now());

    table.foreign("user_id").references("id").inTable("users");
    table.foreign("expense_id").references("id").inTable("expenses");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("entries");
};
