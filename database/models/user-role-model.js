const db = require(`../dbConfig`);
const roles = require(`./roles-model`);

const find = (user_id = undefined) => {
  return db(`user_role`)
    .modify(qb => {
      if (user_id) {
        qb.where({ user_id }).first();
      }
    })
    // .then(user_role => roles.find(user_role.role_id))
    // .then(role => role.role);
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
  const { id } = role;
  return db(`user_role`)
    .where({ id })
    .update({ user_id, role_id })
    .then(() =>
      db(`user_role`)
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
