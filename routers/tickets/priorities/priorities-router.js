const router = require("express").Router();

const bodyValidation = require(`../../../api/middleware/body-validation`);
const Priorities = require(`../../../database/models/priorities-model`);

router.get(`/`, (req, res) => {
  Priorities.find()
    .then(priorities => res.status(200).json({ priorities }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.get(`/:id`, (req, res) => {
  Priorities.find(req.params.id)
    .then(priority => res.status(200).json({ priority }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.post(`/`, bodyValidation([`name`, `level`]), (req, res) => {
  const { name, level } = req.body;
  Priorities.add({ name, level: parseInt(level) })
    .then(priority => res.status(201).json({ priority }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.put(`/:id`, (req, res) => {
  const { name, level } = req.body;
  const fieldsToUpdate = { name, level };
  Object.keys(fieldsToUpdate).forEach(
    key => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
  );

  if (fieldsToUpdate && fieldsToUpdate.level) {
    fieldsToUpdate.level = parseInt(fieldsToUpdate.level);
  }

  Priorities.update({ id: req.params.id, ...fieldsToUpdate })
    .then(priority => res.status(202).json({ priority }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.delete(`/:id`, (req, res) => {
  Priorities.remove(req.params.id)
    .then(priority => res.status(200).json({ message: "Deleted Successfully" }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

module.exports = router;
