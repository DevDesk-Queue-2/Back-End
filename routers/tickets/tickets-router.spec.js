require(`dotenv`).config({ silent: true });

const request = require("supertest");
const express = require("express");

const db = require("../../database/dbConfig");
const router = require("./tickets-router");

const preLoadServer = async () => {
  const server = express();
  server.use(express.json());
  server.use(
    "/",
    function(req, res, next) {
      req.token = { user: { id: 1 } };
      req.ticket_id = req.params.id;
      next();
    },
    router
  );
  await db("priorities").insert({ name: "test", level: 1 });
  await db("ticket_status").insert({ status: "status" });
  await db("categories").insert({ category: "test" });
  await db("users").insert({
    first_name: "test",
    last_name: "test",
    username: "test",
    password: "test",
    email: "test",
    created: "1/1/7"
  });
  return server;
};

describe("tickets-router.js", () => {
  beforeEach(async () => {
    await db("user_role").truncate();
    await db("roles").truncate();
    await db("users").truncate();
    await db("helpers_tickets").truncate();
    await db("tickets").truncate();
    await db("priorities").truncate();
    await db("ticket_status").truncate();
    await db("categories").truncate();
  });

  describe("post /api/tickets", () => {
    it("should add a ticket", async () => {
      const server = await preLoadServer();
      const post = await request(server)
        .post("/")
        .send({
          user_id: 1,
          title: "title",
          description: "description",
          priority_level: 1,
          status_id: 1,
          category_id: 1
        });
      expect(post.body.ticket).toMatchObject({
        category_id: 1,
        description: "description",
        id: 1,
        priority_level: 1,
        status_id: 1,
        title: "title",
        user_id: 1
      });
    });
  });

  describe("get /api/tickets", () => {
    it("should return tickets from the database", async () => {
      const server = await preLoadServer();
      await request(server)
        .post("/")
        .send({
          user_id: 1,
          title: "title",
          description: "description",
          priority_level: 1,
          status_id: 1,
          category_id: 1
        });
      const get = await request(server).get("/");
      expect(get.body.tickets).toMatchObject([
        {
          category_id: 1,
          description: "description",
          id: 1,
          priority: "test",
          priority_level: 1,
          status: "status",
          title: "title",
          user_id: 1
        }
      ]);
    });
  });
});
