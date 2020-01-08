const db = require(`../dbConfig`);

const find = (role = undefined) => {
  return db(`roles`).modify(qb => {
    if (role) {
      qb.where({ id: role }).first();
    }
  });
};

const add = role => {
  return db(`roles`)
    .insert(role, "id")
    .then(([id]) =>
      db(`roles`)
        .where({ id })
        .first()
    );
};

const remove = id => {
  return db(`roles`)
    .del()
    .where({ id });
};

const update = roleData => {
  const { id, role } = roleData;
  return db(`roles`)
    .where({ id })
    .update({ role })
    .then(() =>
      db(`roles`)
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
