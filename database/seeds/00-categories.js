exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("categories")
    .del()
    .then(async function() {
      // Inserts seed entries
      return knex("categories").insert([
        { id: 1, category: "None" },
        { id: 2, category: "React" },
        { id: 3, category: "JavaScript" },
        { id: 4, category: "HTML" },
        { id: 5, category: "CSS" }
      ]);
    })
    .then(() => {
      if (process.env.DB_ENV === "production") {
        knex.raw(`select setval('id', (select max(id) from categories)`);
      }
    });
};
