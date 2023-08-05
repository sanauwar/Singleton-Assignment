/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('phone_number_t', function (table) {
        table.uuid('id').primary().notNullable();
        table.uuid('candidate_id').references('id').inTable('candidate_t').onDelete('CASCADE');
        table.string('type').notNullable();
        table.string('number').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('phone_number_t');
  };
