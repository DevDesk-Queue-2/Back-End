exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user_role")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user_role").insert([
        { id: 1, user_id: 1, role_id: 1 },
        { id: 2, user_id: 2, role_id: 2 }
      ]);
    })
    .then(() => {
      if (process.env.DB_ENV === "production") {
        knex.raw(
          `select setval('user_role_id_seq', (select max(id) from user_role)`
        );
      }
    });
};
