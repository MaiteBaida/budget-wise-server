/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {

      username: 'carol_smith',
      email: 'carols@budgetwise.com',
      password: 'password',
      token: ' ',
      first_name: 'Carol',
      last_name: 'Smith',
      income: 0.0,
      income_frequency: ' ',
    }
  ]);
};
