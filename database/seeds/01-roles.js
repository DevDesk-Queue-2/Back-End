exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("roles")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("roles").insert([
        { role: "Student" },
        { role: "Helper" },
        { role: "admin" }
      ]);
    })
    .then(() => {
      if (process.env.DB_ENV === "production") {
        knex.raw(`select setval('roles_id_seq', (select max(id) from roles)`);
      }
    });
};
