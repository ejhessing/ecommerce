
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1001, email: 'someone@example.com', password: "abc123", name: 'ray', address: "3 somewhere street", city: "auckland", country: "New Zealand", postcode: 4502}),
        knex('users').insert({id: 1002, email: 'someone@example.com', password: "abc123", name: 'bill', address: "2 somewhere street", city: "auckland", country: "New Zealand", postcode: 4502}),
        knex('users').insert({id: 1003, email: 'someone@example.com', password: "abc123", name: 'ray', address: "3 somewhere street", city: "auckland", country: "New Zealand", postcode: 4502})
      ]);
    });
};
