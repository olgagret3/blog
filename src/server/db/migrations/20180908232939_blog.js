
exports.up = (knex, Promise) => {
  return knex.schema.createTable('blog', (table) => {
    table.increments();
    table.string('picture').notNullable();
    table.string('name').notNullable();
    table.string('text').notNullable();
    table.string('tag');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('blog');
};
