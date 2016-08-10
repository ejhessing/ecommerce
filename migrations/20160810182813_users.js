
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('email')
    table.string('password')
    table.string('name')
    table.string('address')
    table.string('city')
    table.string('country')
    table.string('postcode')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
