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
    });
};
