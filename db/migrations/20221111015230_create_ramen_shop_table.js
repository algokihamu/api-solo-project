/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("ramen_shop", function (table) {
    table.increments("id").primary();
    table.string("name", 32).notNullable();
    table.string("city", 32);
    table.string("region", 32);
    table.string("address", 64);
    table.string("tel_number", 16);
    table.string("postal_code", 16).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("ramen_shop");
};
