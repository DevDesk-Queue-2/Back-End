exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();
    users.string("first_name").notNullable();
    users.string("last_name").notNullable();
    users
      .string("username")
      .notNullable()
      .unique();
    users.string("password").notNullable();
    users.string("email");
    users.string("created").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
