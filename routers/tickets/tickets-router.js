const router = require("express").Router();

const ticketStatusRouter = require(`./ticket-status/ticket-status-router`);
const categoriesRouter = require(`./categories/categories-router`);
const prioritiesRouter = require(`./priorities/priorities-router`);

const bodyValidation = require(`../../api/middleware/body-validation`);
const Tickets = require(`../../database/models/tickets-model`);

router.use("/categories", categoriesRouter);
router.use("/status", ticketStatusRouter);
router.use("/priorities", prioritiesRouter);

router.get(`/`, (req, res) => {
  Tickets.find()
    .then(tickets => res.status(200).json({ tickets }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ errorMessage: error });
    });
});

router.get(`/:id`, (req, res) => {
  Tickets.find({ ticketId: req.params.id })
    .then(ticket => res.status(200).json({ ticket }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.post(
  `/`,
  bodyValidation([`title`, `description`, `level`, `status_id`]),
  (req, res) => {
    const { id } = req.token.user;
    const { title, description, level, status_id } = req.body;
    const ticketData = {
      owner: id,
      title,
      description,
      priority_level: level,
      status_id
    };

    Tickets.add(ticketData)
      .then(ticket => res.status(201).json({ ticket }))
      .catch(error => res.status(500).json({ errorMessage: error }));
  }
);

router.put(`/:id`, (req, res) => {
  const { title, description, level, status_id } = req.body;
  const priority_level = level;

  const fieldsToUpdate = Object.keys({
    title,
    description,
    priority_level,
    status_id
  }).forEach(key => obj[key] === undefined && delete obj[key]);

  Tickets.update({ id: req.params.id, ...fieldsToUpdate })
    .then(ticket => res.status(202).json({ ticket }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.delete(`/:id`, (req, res) => {
  Tickets.delete(req.params.id)
    .then(deleted =>
      res.status(200).json({ message: `Deleted ticket ${req.params.id}` })
    )
    .catch(error => res.status(500).json({ errorMessage: error }));
});

module.exports = router;