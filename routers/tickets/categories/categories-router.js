const router = require("express").Router();

const bodyValidation = require(`../../../api/middleware/body-validation`);
const Categories = require(`../../../database/models/categories-model`);

router.get(`/`, (req, res) => {
  Categories.find()
    .then(categories => res.status(200).json({ categories }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.get(`/:id`, (req, res) => {
  Categories.find(req.params.id)
    .then(category => res.status(200).json({ category }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.post(`/`, bodyValidation([`category`]), (req, res) => {
  Categories.add(req.body)
    .then(category => res.status(201).json({ category }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.put(`/:id`, bodyValidation([`category`]), (req, res) => {
  Categories.update({ id: req.params.id, category: req.body.category })
    .then(category => res.status(202).json({ category }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ errorMessage: error });
    });
});

router.delete(`/:id`, (req, res) => {
  Categories.remove(req.params.id)
    .then(category => res.status(200).json({ message: "Deleted Successfully" }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

module.exports = router;
