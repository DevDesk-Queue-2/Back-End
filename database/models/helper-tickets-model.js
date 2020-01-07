const db = require(`../dbConfig`);

const find = (user_id = undefined) => {
  return db(`helpers_tickets`)
    .modify(qb => {
      if (user_id) {
        qb.where({ user_id });
      }
    })
    .then(tickets => tickets.map(ticket => ticket.ticket_id))
};

const add = ({ user_id, ticket_id }) => {
  return db(`helpers_tickets`)
    .insert({ user_id, ticket_id }, "id")
    .then(([id]) =>
      db(`helpers_tickets`)
        .where({ id })
        .first()
    );
};

const remove = id => {
  return db(`helpers_tickets`)
    .del()
    .where({ id });
};

const update = ({ user_id, ticket_id }) => {
  const { id } = role;
  return db(`helpers_tickets`)
    .where({ id })
    .update({ user_id, ticket_id })
    .then(() =>
      db(`helpers_tickets`)
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
