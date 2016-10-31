
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reset', function (table) {
    table.increments('id').primary()
    table.integer('user_id')
    table.string('token')
    table.date('expiredAt')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reset')
};
