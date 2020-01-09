const db = require(`../dbConfig`);

const find = (username = undefined) => {
  return db(`users`).modify(qb => {
    if (username) {
      qb.where({ username }).first();
    }
  });
};

const add = user => {
  return db(`users`)
    .insert(user, "id")
    .then(([id]) =>
      db(`users`)
        .where({ id })
        .first()
    );
};

const remove = id => {
  return db(`users`)
    .del()
    .where({ id });
};

const update = user => {
  const { id } = user;
  return db(`users`)
    .where({ id })
    .update({ ...user })
    .then(() =>
      db(`users`)
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
