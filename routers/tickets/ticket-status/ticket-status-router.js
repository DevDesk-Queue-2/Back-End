const router = require("express").Router();

const bodyValidation = require(`../../../api/middleware/body-validation`);
const Status = require(`../../../database/models/ticket-status-model`);

router.get(`/`, (req, res) => {
  Status.find()
    .then(statusList => res.status(200).json({ statusList }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.get(`/:id`, (req, res) => {
  Status.find(req.params.id)
    .then(status => res.status(200).json({ status }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.post(`/`, bodyValidation([`status`]), (req, res) => {
  Status.add(req.body)
    .then(status => res.status(201).json({ status }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.put(`/:id`, bodyValidation([`status`]), (req, res) => {
  Status.update({ id: req.params.id, status: req.body.status })
    .then(status => res.status(202).json({ status }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.delete(`/:id`, (req, res) => {
  Status.remove(req.params.id)
    .then(status => res.status(200).json({ message: "Deleted Successfully" }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

module.exports = router;
