const db = require(`../dbConfig`);

const find = ({ user_id }) => {
  return db(`user_role`).modify(qb => {
    if (user_id) {
      qb.where({ user_id }).first();
    }
  });
};

const add = ({ user_id, role_id }) => {
  return db(`user_role`)
    .insert({ user_id, role_id }, "id")
    .then(([id]) =>
      db(`user_role`)
        .where({ id })
        .first()
    );
};

const remove = id => {
  return db(`user_role`)
    .del()
    .where({ id });
};

const update = ({ user_id, role_id }) => {
  return db(`user_role`)
    .where({ user_id })
    .update({ role_id })
    .then(() =>
      db(`user_role`)
        .where({ user_id })
        .first()
    );
};

module.exports = {
  find,
  add,
  remove,
  update
};
