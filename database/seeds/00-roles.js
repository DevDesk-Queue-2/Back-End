exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("roles")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("roles").insert([
        { id: 1, role: "Student" },
        { id: 2, role: "Helper" },
        { id: 3, role: "admin" }
      ]);
    });
};
