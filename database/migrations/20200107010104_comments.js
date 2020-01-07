exports.up = function(knex) {
  return knex.schema.createTable("comments", comments => {
    comments.increments();
    comments
      .integer("ticket_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("tickets")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    comments
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    comments.string("description").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("comments");
};
