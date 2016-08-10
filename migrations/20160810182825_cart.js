exports.up = function(knex, Promise) {
  return knex.schema.createTable('cart', function (table) {
    table.increments('id').primary()
    table.integer('product_id')
    table.integer('user_id')
    table.integer('quantity')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cart')
};
