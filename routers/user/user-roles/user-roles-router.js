const router = require("express").Router();
const formatDate = require("date-fns").format;

const UserRole = require(`../../../database/models/user-role-model`);
const bodyValidation = require(`../../../api/middleware/body-validation`);

router.get(`/`, (req, res) => {
  UserRole.find({ user_id: req.user.id })
    .then(role => res.status(200).json({ role }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ errorMessage: error });
    });
});

router.post(`/`, bodyValidation(["role_id"]), (req, res) => {
  UserRole.add({
    user_id: req.user.id,
    role_id: req.body.role_id
  })
    .then(role => res.status(201).json({ role }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ errorMessage: error });
    });
});

router.post(`/:userId`, bodyValidation(["role_id"]), (req, res) => {
  UserRole.find({ user_id: req.params.userId })
    .then(role => {
      if (role && role[0].id) {
        UserRole.update({
          role_id: req.body.role_id,
          user_id: req.params.userId
        })
          .then(role => res.status(202).json({ role }))
          .catch(error => res.status(500).json({ errorMessage: error }));
      } else {
        UserRole.add({
          user_id: req.params.userId,
          role_id: req.body.role_id
        })
          .then(role => res.status(201).json({ role }))
          .catch(error => {
            console.error(error);
            res.status(500).json({ errorMessage: error });
          });
      }
    })
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.put(`/`, bodyValidation(["role_id"]), (req, res) => {
  UserRole.update({
    role_id: req.body.role_id,
    user_id: req.user.id
  })
    .then(role => res.status(202).json({ role }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ errorMessage: error });
    });
});

router.delete(`/`, (req, res) => {
  UserRole.remove(req.user.id)
    .then(role => res.status(200).json({ message: `Deleted Successfully` }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

module.exports = router;
