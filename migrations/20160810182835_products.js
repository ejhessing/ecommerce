exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.integer('price')
    table.string('image')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products')
};
