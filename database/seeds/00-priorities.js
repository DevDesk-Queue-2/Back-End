exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("priorities")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("priorities").insert([
        { id: 1, name: "Low", level: 5 },
        { id: 2, name: "Medium", level: 3 },
        { id: 3, name: "High", level: 1 }
      ]);
    })
    .then(() => {
      if (process.env.DB_ENV === "production") {
        knex.raw(`select setval('id', (select max(id) from priorities)`);
      }
    });
};
