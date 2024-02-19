exports.up = function (knex) {
  return knex.schema.table("expenses", function (table) {
    table.renameColumn("estimated_amount", "budget");
    table.dropColumn("paid_amount");
    table.dropColumn("notes");
    table.string("type").notNullable().alter();
    table.string("frequency").alter();
  });
};

exports.down = function (knex) {
  return knex.schema.table("expenses", function (table) {
    table.renameColumn("budget", "estimated_amount");
    table.decimal("paid_amount", 10, 2);
    table.text("notes");
    table.string("type").nullable().alter();
    table.string("frequency").nullable().alter();
  });
};
