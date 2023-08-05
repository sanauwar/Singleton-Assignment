/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('address_t', function (table) {
        table.uuid('id').primary().notNullable();
        table.string('country').notNullable();
        table.string('street_address').notNullable();
        table.string('city').notNullable();
        table.string('state');
        table.string('postal_code').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("address_t");
};
