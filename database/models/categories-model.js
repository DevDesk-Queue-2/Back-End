const db = require(`../dbConfig`);

const find = (category = undefined) => {
  return db(`categories`).modify(qb => {
    if (category) {
      qb.where({ id: category }).first();
    }
  });
};

const add = category => {
  return db(`categories`)
    .insert(category, "id")
    .then(([id]) =>
      db(`categories`)
        .where({ id })
        .first()
    );
};

const remove = id => {
  return db(`categories`)
    .del()
    .where({ id });
};

const update = ({ id, category }) => {
  return db(`categories`)
    .where({ id })
    .update({ category })
    .then(() =>
      db(`categories`)
        .where({ id })
        .first()
    );
};

module.exports = {
  find,
  add,
  remove,
  update
};
