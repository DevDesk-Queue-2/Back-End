exports.up = function(knex) {
  return knex.schema
    .createTable("roles", roles => {
      roles.increments();
      roles
        .string("role")
        .notNullable()
        .unique();
    })
    .createTable("user_role", ur => {
      ur.increments();
      ur.integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      ur.integer("role_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("user_role").dropTableIfExists("roles");
};
