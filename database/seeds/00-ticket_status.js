exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("ticket_status")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("ticket_status").insert([
        { id: 1, status: "New" },
        { id: 2, status: "In Progress" },
        { id: 3, status: "Complete" }
      ]);
    });
};
