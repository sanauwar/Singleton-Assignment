/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('experience_t', function (table) {
        table.uuid('id').primary().notNullable();
        table.uuid('candidate_id').references('id').inTable('candidate_t').onDelete('CASCADE');
        table.string('company').notNullable();
        table.string('title').notNullable();
        table.integer('years').notNullable();
    });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('experience_t');
};
