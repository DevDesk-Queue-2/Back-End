exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tickets")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tickets").insert([
        {
          id: 1,
          title: "Unable to deploy server",
          description: "How to mongodb?",
          priority_level: 5,
          status_id: 1,
          user_id: 1,
          category_id: 1
        },
        {
          id: 2,
          title: "No hyperdrive",
          description:
            "Took heavy damage to rear shields, hyperdrive is offline",
          priority_level: 1,
          status_id: 1,
          user_id: 1,
          category_id: 2
        }
      ]);
    });
};