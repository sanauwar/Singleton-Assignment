/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("candidate_t", (table) => {
        table.uuid('id').primary().notNullable();
        table.uuid('owner_id').references('id').inTable('user_t');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.integer('age');
        table.string('department');
        table.decimal('min_salary_expectation', 10, 2);
        table.decimal('max_salary_expectation', 10, 2);
        table.uuid('currency_id').references('id').inTable('currency_t');
        table.uuid('address_id').references('id').inTable('address_t');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("candidate_t");
};
