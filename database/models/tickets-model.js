const db = require(`../dbConfig`);

const find = ({ ticketId, userId } = {}) => {
  console.log({ ticketId });
  console.log({ userId });
  return db(`tickets`)
    .modify(qb => {
      if (ticketId) {
        qb.where({ "tickets.id": ticketId }).first();
      }
      if (userId) {
        qb.where({ user_id: userId });
      }
    })
    .join(`priorities`, { "tickets.priority_level": "priorities.level" })
    .join(`ticket_status`, { "tickets.status_id": "ticket_status.id" })
    .select(
      "tickets.id",
      "tickets.title",
      "tickets.description",
      "ticket_status.status",
      "priorities.name as priority",
      "tickets.priority_level",
      "tickets.user_id",
      "tickets.category_id"
    );
};

const add = ticketData => {
  return db(`tickets`)
    .insert(ticketData, "id")
    .then(([id]) =>
      db(`tickets`)
        .where({ id })
        .first()
    );
};

const remove = id => {
  return db(`tickets`)
    .del()
    .where({ id });
};

const update = ticket => {
  const { id } = ticket;
  return db(`tickets`)
    .where({ id })
    .update({ ...ticket })
    .then(() =>
      db(`tickets`)
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
