const router = require("express").Router();
const formatDate = require("date-fns").format;

const Helper = require(`../../../database/models/helper-tickets-model`);

router.get(`/`, (req, res) => {
  Helper.find({ ticket_id: req.params.id })
    .then(helper => res.status(200).json(helper))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.post(`/`, (req, res) => {
  Helper.add({
    user_id: req.token.user.id,
    ticket_id: req.ticket_id,
    assigned_date: formatDate(new Date(), "MM/dd/yyyy ppp")
  })
    .then(helper => res.status(201).json({ helper }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ errorMessage: error });
    });
});

router.post(`/:userId`, (req, res) => {
  Helper.find({ ticket_id: req.params.id })
    .then(helper => {
      if (helper && helper[0].id) {
        Helper.update({
          ticket_id: req.ticket_id,
          user_id: req.params.userId,
          assigned_date: formatDate(new Date(), "MM/dd/yyyy ppp")
        })
          .then(helper => res.status(202).json({ helper }))
          .catch(error => res.status(500).json({ errorMessage: error }));
      } else {
        Helper.add({
          user_id: req.params.userId,
          ticket_id: req.ticket_id,
          assigned_date: formatDate(new Date(), "MM/dd/yyyy ppp")
        })
          .then(helper => res.status(201).json({ helper }))
          .catch(error => {
            console.error(error);
            res.status(500).json({ errorMessage: error });
          });
      }
    })
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.put(`/`, (req, res) => {
  const { id } = req.token.user;
  Helper.update({
    ticket_id: req.ticket_id,
    user_id: id,
    assigned_date: formatDate(new Date(), "MM/dd/yyyy ppp")
  })
    .then(helper => res.status(202).json({ helper }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

router.delete(`/`, (req, res) => {
  Helper.remove(req.ticket_id)
    .then(helper => res.status(200).json({ message: `Deleted Successfully` }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

module.exports = router;
