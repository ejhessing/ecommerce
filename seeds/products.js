
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('products').insert({id: 301, name: 't-shirt blue', price: 14, image: "http://bsccongress.com/im4/blue-shirt-clip-art.png"}),
        knex('products').insert({id: 302, name: 't-shirt red', price: 24, image: "http://www.clker.com/cliparts/8/4/i/v/6/X/red-t-shirt-hi.png"}),
        knex('products').insert({id: 303, name: 't-shirt green', price: 34, image: "http://www.clker.com/cliparts/m/O/n/c/U/O/green-t-shirt.svg"}),
        knex('products').insert({id: 304, name: 't-shirt blue', price: 14, image: "http://bsccongress.com/im4/blue-shirt-clip-art.png"}),
        knex('products').insert({id: 305, name: 't-shirt red', price: 24, image: "http://www.clker.com/cliparts/8/4/i/v/6/X/red-t-shirt-hi.png"}),
        knex('products').insert({id: 306, name: 't-shirt green', price: 34, image: "http://www.clker.com/cliparts/m/O/n/c/U/O/green-t-shirt.svg"}),
        knex('products').insert({id: 307, name: 't-shirt blue', price: 14, image: "http://bsccongress.com/im4/blue-shirt-clip-art.png"}),
        knex('products').insert({id: 308, name: 't-shirt red', price: 24, image: "http://www.clker.com/cliparts/8/4/i/v/6/X/red-t-shirt-hi.png"}),
        knex('products').insert({id: 309, name: 't-shirt green', price: 34, image: "http://www.clker.com/cliparts/m/O/n/c/U/O/green-t-shirt.svg"})
      ]);
    });
};
