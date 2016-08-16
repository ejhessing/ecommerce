exports.up = function(knex, Promise) {
  // return knex.schema.createTable('history', function (table) {
  //   table.increments('id').primary()
  //   table.date('date')
  //   table.integer('user_id')
  //   table.integer('product_id')
  // })
};

exports.down = function(knex, Promise) {
  //return knex.schema.dropTable('profile')
};
