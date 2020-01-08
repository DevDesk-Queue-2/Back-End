exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("ticket_status")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("ticket_status").insert([
        { id: 1, status: "New" },
        { id: 2, status: "In Progress" },
        { id: 3, status: "Complete" }
      ]);
    })
    .then(() => {
      if (process.env.DB_ENV === "production") {
        knex.raw(`select setval('ticket_status_id_seq', (select max(id) from ticket_status)`);
      }
    });
};
