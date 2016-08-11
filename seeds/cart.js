
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cart').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('cart').insert({id: 801, user_id: null, product_id: 301, quantity: 1}),
        knex('cart').insert({id: 802, user_id: null, product_id: 301, quantity: 1}),
        knex('cart').insert({id: 803, user_id: null, product_id: 302, quantity: 1})
      ]);
    });
};
