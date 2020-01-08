const db = require(`../dbConfig`);

const find = (priority = undefined) => {
  return db(`priorities`).modify(qb => {
    if (priority) {
      qb.where({ id: priority }).first();
    }
  });
};

const add = ({ name, level }) => {
  return db(`priorities`)
    .insert({ name, level }, "id")
    .then(([id]) =>
      db(`priorities`)
        .where({ id })
        .first()
    );
};

const remove = id => {
  return db(`priorities`)
    .del()
    .where({ id });
};

const update = priority => {
  const { id } = priority;
  return db(`priorities`)
    .where({ id })
    .update({ ...priority })
    .then(() =>
      db(`priorities`)
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
