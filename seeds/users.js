
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1001, email: 'someone@example.com', password: "abc123"}),
        knex('users').insert({id: 1002, email: 'someone@example.com', password: "abc123"}),
        knex('users').insert({id: 1003, email: 'someone@example.com', password: "abc123"})
      ]);
    });
};
