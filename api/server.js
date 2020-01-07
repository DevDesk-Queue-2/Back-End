const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require(`morgan`);

const authenticate = require("./middleware/jwt-authorization");

const userRouter = require("../routers/user/user-router");
const rolesRouter = require(`../routers/roles/role-router`);
const ticketsRouter = require(`../routers/tickets/tickets-router`);

const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.use("/api/user", userRouter);
server.use("/api/roles", [authenticate, rolesRouter]);
server.use("/api/tickets", [authenticate, ticketsRouter]);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
