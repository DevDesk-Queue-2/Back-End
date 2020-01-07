exports.up = function(knex) {
  return knex.schema.createTable("helpers_tickets", ht => {
    ht.increments();
    ht.integer("ticket_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("tickets")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    ht.integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    ht.string("assigned_date").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("helpers_tickets");
};
