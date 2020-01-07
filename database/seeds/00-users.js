exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "admin",
          password: "unknown",
          email: "admin@example.com",
          first_name: "Han",
          last_name: "Solo",
          created: "1/7/2020"
        },
        {
          id: 2,
          username: "user1",
          password: "unknown",
          email: "user@example.com",
          first_name: "Luke",
          last_name: "Skywalker",
          created: "1/7/2020"
        },
        {
          id: 3,
          username: "user2",
          password: "unknown",
          email: "user@example.com",
          first_name: "Darth",
          last_name: "Vader",
          created: "1/7/2020"
        }
      ]);
    });
};
