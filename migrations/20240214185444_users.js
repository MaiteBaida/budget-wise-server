/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary(); 
        table.string('username').unique();
        table.string('email');
        table.string('password');
        table.string('token').unique();
        table.string('first_name');
        table.string('last_name');
        table.decimal('income', 10, 2).nullable(); 
        table.string('income_frequency').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
