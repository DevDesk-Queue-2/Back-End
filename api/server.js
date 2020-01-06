const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require(`morgan`);

const authenticate = require("./middleware/jwt-authorization");
const authRouter = require("../auth/auth-router");

const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
