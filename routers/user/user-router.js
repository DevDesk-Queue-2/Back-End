const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require(`jsonwebtoken`);
const formatDate = require("date-fns").format;

const bodyValidation = require(`../../api/middleware/body-validation`);
const validateToken = require(`../../api/middleware/jwt-authorization`);

const Users = require(`../../database/models/users-model`);
const Tickets = require(`../../database/models/tickets-model`);
const Helper = require(`../../database/models/helper-tickets-model`);

const signToken = payload => {
  return jwt.sign(payload, process.env.secret, {
    expiresIn: "1h"
  });
};

router.post(
  "/register",
  bodyValidation([`username`, `password`, `first_name`, `last_name`]),
  (req, res) => {
    const { username, password, email, first_name, last_name } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    Users.add({
      username,
      password: hash,
      email,
      first_name,
      last_name,
      created: formatDate(new Date(), "MM/dd/yyyy ppp")
    })
      .then(user => {
        delete user.password;
        const token = signToken({ user });
        res.status(201).json({ token, user });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
);

router.post("/login", bodyValidation([`username`, `password`]), (req, res) => {
  let { username, password } = req.body;

  Users.find(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        delete user.password;
        const token = signToken({ user });
        res
          .status(200)
          .json({ token, user, message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/", validateToken, (req, res) => {
  const { username, password, email, first_name, last_name } = req.body;
  const fieldsToUpdate = {
    username,
    password,
    email,
    first_name,
    last_name
  };
  Object.keys(fieldsToUpdate).forEach(
    key => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
  );

  if (fieldsToUpdate && fieldsToUpdate.password) {
    fieldsToUpdate.password = bcrypt.hashSync(fieldsToUpdate.password, 10);
  }

  Users.update({ id: req.token.user.id, ...fieldsToUpdate })
    .then(({ id, username, email, created }) => {
      res
        .status(201)
        .json({ message: "Updated", user: { id, username, email, created } });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/tickets", validateToken, (req, res) => {
  const { id } = req.token.user;
  Tickets.find({ userId: id })
    .then(tickets => res.status(200).json({ tickets }))
    .catch(error => res.status(500).json(error));
});

router.get(`/helping`, validateToken, (req, res) => {
  Helper.find({ user_id: req.token.user.id })
    .then(helper => res.status(200).json({ helper }))
    .catch(error => res.status(500).json({ errorMessage: error }));
});

module.exports = router;
