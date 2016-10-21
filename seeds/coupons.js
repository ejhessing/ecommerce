
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coupons').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('coupons').insert({discount: 10, code: "code10"}),
        knex('coupons').insert({discount: 25, code: "code25"}),
        knex('coupons').insert({discount: 50, code: "code50"}),
        knex('coupons').insert({discount: 99, code: "code99"})
      ]);
    });
};