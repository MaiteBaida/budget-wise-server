/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('expenses', function(table) {
        table.increments('id').primary();
        table.string('name'); 
        table.decimal('estimated_amount', 10, 2);
        table.decimal('paid_amount', 10, 2);
        table.string('frequency'); 
        table.string('type');
        table.text('notes');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('users');
        table.boolean('active'); 
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('expenses');
  };
