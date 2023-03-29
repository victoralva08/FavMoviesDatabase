/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => {return knex.schema.createTable('movie_tags', table => {

    table.increments('id').primary()

    table.integer('note_id').references('id').inTable('movie_notes').onDelete('CASCADE');
    table.integer('user_id').references('id').inTable('users');

    table.text('name')

}) };


exports.down = function(knex) { knex.schema.dropTable('movie_tags') }
