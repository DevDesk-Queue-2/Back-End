const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "admin",
          password: bcrypt.hashSync("admin", 10),
          email: "admin@example.com",
          first_name: "Han",
          last_name: "Solo",
          created: "1/7/2020"
        },
        {
          username: "user1",
          password: bcrypt.hashSync("user1", 10),
          email: "user@example.com",
          first_name: "Luke",
          last_name: "Skywalker",
          created: "1/7/2020"
        },
        {
          username: "user2",
          password: bcrypt.hashSync("user2", 10),
          email: "user@example.com",
          first_name: "Darth",
          last_name: "Vader",
          created: "1/7/2020"
        }
      ]);
    })
    .then(() => {
      if (process.env.DB_ENV === "production") {
        knex.raw(`select setval('users_id_seq', (select max(id) from users)`);
      }
    });
};
