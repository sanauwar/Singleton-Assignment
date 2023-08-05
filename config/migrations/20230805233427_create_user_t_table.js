/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('user_t', function (table) {
        table.uuid('id').primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        // Additional columns, constraints, or indexes can be added here if needed.
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user_t');
};
