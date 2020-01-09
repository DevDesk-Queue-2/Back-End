exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("ticket_status")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("ticket_status").insert([
        { status: " None" },
        { status: "New" },
        { status: "In Progress" },
        { status: "Complete" }
      ]);
    })
    .then(() => {
      if (process.env.DB_ENV === "production") {
        knex.raw(
          `select setval('ticket_status_id_seq', (select max(id) from ticket_status)`
        );
      }
    });
};
