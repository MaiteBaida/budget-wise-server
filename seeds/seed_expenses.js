exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('expenses').del();
    await knex('expenses').insert([
      {
        id: 1,
        name: 'Mortgage',
        estimated_amount: 2100,
        paid_amount: 2100,
        frequency: 'Montly',
        type: 'Fixed Expense',
        notes: ' ',
        user_id: 1,
        active: true,
      },
    ]);
  };


