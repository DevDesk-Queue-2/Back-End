const router = require("express").Router();

const bodyValidation = require(`../../api/middleware/body-validation`);
const Roles = require(`../../database/models/roles-model`);

router.get(`/`, (req, res) => {
  Roles.find()
    .then(roles => res.status(200).json({ roles }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.get(`/:id`, (req, res) => {
  Roles.find(req.params.id)
    .then(roles => res.status(200).json({ roles }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.post(`/`, bodyValidation([`role`]), (req, res) => {
  Roles.add(req.body)
    .then(role => res.status(201).json({ role }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.put(`/:id`, bodyValidation([`role`]), (req, res) => {
  Roles.update({ id: req.params.id, role: req.body.role })
    .then(role => res.status(202).json({ role }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.delete(`/:id`, (req, res) => {
  Roles.delete(req.params.id)
    .then(role => res.status(200).json({ role }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

module.exports = router;
