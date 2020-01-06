const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require(`jsonwebtoken`);
const formatDate = require("date-fns").format;

const userBodyValidation = require(`../api/middleware/user-body-validation`);

const Users = require(`../database/models/users-model`);

const signToken = payload => {
  return jwt.sign(payload, process.env.secret, {
    expiresIn: "1h"
  });
};

router.post(
  "/register",
  userBodyValidation([`username`, `password`]),
  (req, res) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    Users.add({
      username,
      password: hash,
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

router.post(
  "/login",
  userBodyValidation([`username`, `password`]),
  (req, res) => {
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
  }
);

module.exports = router;
