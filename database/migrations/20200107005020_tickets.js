exports.up = function(knex) {
  return knex.schema
    .createTable("priorities", priorities => {
      priorities.increments();
      priorities
        .string("name")
        .notNullable()
        .unique();
      priorities
        .integer("level")
        .unsigned()
        .notNullable()
        .unique();
    })
    .createTable("ticket_status", ts => {
      ts.increments();
      ts.string("status")
        .notNullable()
        .unique();
    })
    .createTable("categories", categories => {
      categories.increments();
      categories
        .string("category")
        .notNullable()
        .unique();
    })
    .createTable("tickets", tickets => {
      tickets.increments();
      tickets.string("title").notNullable();
      tickets.string("description").notNullable();
      tickets
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("categories")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tickets
        .integer("priority_level")
        .unsigned()
        .notNullable()
        .references("level")
        .inTable("priorities")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tickets
        .integer("status_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("ticket_status")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tickets
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("tickets")
    .dropTableIfExists("categories")
    .dropTableIfExists("ticket_status")
    .dropTableIfExists("priorities");
};
