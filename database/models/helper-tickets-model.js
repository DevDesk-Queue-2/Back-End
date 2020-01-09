const db = require(`../dbConfig`);

const find = ({ ticket_id, user_id } = {}) => {
  return db(`helpers_tickets`).modify(qb => {
    if (ticket_id) {
      qb.where({ ticket_id }).first();
    }
    if (user_id) {
      qb.where({ user_id });
    }
  });
};

const add = ({ user_id, ticket_id, assigned_date }) => {
  return db(`helpers_tickets`)
    .insert({ user_id, ticket_id, assigned_date }, "id")
    .then(([id]) =>
      db(`helpers_tickets`)
        .where({ id })
        .first()
    );
};

const remove = ticket_id => {
  return db(`helpers_tickets`)
    .del()
    .where({ ticket_id });
};

const update = ({ user_id, ticket_id, assigned_date }) => {
  return db(`helpers_tickets`)
    .where({ ticket_id })
    .update({ user_id, assigned_date })
    .then(() =>
      db(`helpers_tickets`)
        .where({ ticket_id })
        .first()
    );
};

module.exports = {
  find,
  add,
  remove,
  update
};
