exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("priorities")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("priorities").insert([
        { name: " None", level: 0 },

        { name: "Low", level: 5 },
        { name: "Medium", level: 3 },
        { name: "High", level: 1 }
      ]);
    })
    .then(() => {
      if (process.env.DB_ENV === "production") {
        knex.raw(`select setval('priorities_id_seq', (select max(id) from priorities)`);
      }
    });
};
