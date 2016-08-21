exports.up = function(knex, Promise) {
  return knex.schema.createTable('history', function (table) {
    table.increments('id').primary()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.integer('user_id')
    table.integer('product_id')
    table.integer('quantity')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('history')
};
