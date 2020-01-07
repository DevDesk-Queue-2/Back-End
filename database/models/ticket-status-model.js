const db = require(`../dbConfig`);

const find = (status = undefined) => {
  return db(`ticket_status`).modify(qb => {
    if (status) {
      qb.where({ status }).first();
    }
  });
};

const add = status => {
  return db(`ticket_status`)
    .insert(status, "id")
    .then(([id]) =>
      db(`ticket_status`)
        .where({ id })
        .first()
    );
};

const remove = id => {
  return db(`ticket_status`)
    .del()
    .where({ id });
};

const update = ({ id, status }) => {
  return db(`ticket_status`)
    .where({ id })
    .update({ status })
    .then(() =>
      db(`ticket_status`)
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
