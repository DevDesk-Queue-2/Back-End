exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("categories")
    .del()
    .then(async function() {
      // Inserts seed entries
      return knex("categories").insert([
        { category: "None" },
        { category: "React" },
        { category: "JavaScript" },
        { category: "HTML" },
        { category: "CSS" }
      ]);
    })
    .then(() => {
      if (process.env.DB_ENV === "production") {
        knex.raw(
          `select setval('categories_id_seq', (select max(id) from categories)`
        );
      }
    });
};
