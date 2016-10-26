
exports.up = function(knex, Promise) {
  return knex.schema.createTable('coupons', function (table) {
    table.increments('id').primary()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.integer('discount')
    table.string('code')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('coupons')
};
