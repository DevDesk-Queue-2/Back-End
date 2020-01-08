exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("roles")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("roles").insert([
        { id: 1, role: "Student" },
        { id: 2, role: "Helper" },
        { id: 3, role: "admin" }
      ]);
    })
    .then(() => {
      if (process.env.DB_ENV === "production") {
        knex.raw(`select setval('roles_id_seq', (select max(id) from roles)`);
      }
    });
};
