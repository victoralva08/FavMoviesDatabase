// Creating the Movie_Notes table using the knex query builder

exports.up = function(knex) {return knex.schema.createTable('movie_notes', table => {

    table.increments('id').primary();
    table.text('movie_name');
    table.text('movie_description');
    table.integer('movie_rate');

    table.integer('user_id').references('id').inTable('users');

    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());

}) };

 
exports.down = knex => knex.schema.dropTable('movie_notes');
