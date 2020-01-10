require(`dotenv`).config({ silent: true });

const request = require("supertest");
const express = require("express");

const db = require("../../../database/dbConfig");
const router = require("./helper-router");

const preLoadServer = async () => {
  const server = express();
  server.use(express.json());
  server.use(
    "/:id/helper",
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
  await db("tickets").insert({
    user_id: 1,
    title: "title",
    description: "description",
    priority_level: 1,
    status_id: 1,
    category_id: 1
  });
  return server;
};

describe("helper-router.js", () => {
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

  describe("post /api/tickets/:id/helper", () => {
    it("should add a helper", async () => {
      const server = await preLoadServer();
      const post = await request(server).post("/1/helper");
      expect(post.body.helper).toMatchObject({ id: 1 });
    });
  });

  describe("get /api/tickets/:id/helper", () => {
    it("should return the tickets helper", async () => {
      const server = await preLoadServer();
      await request(server).post("/1/helper");
      const get = await request(server).get("/1/helper");
      expect(get.body[0]).toMatchObject({
        id: 1,
        ticket_id: 1,
        user_id: 1
      });
    });
  });

  describe("delete /api/tickets/:id/helper", () => {
    it("should delete a category from the database", async () => {
      const server = await preLoadServer();
      const helper = await request(server).post("/1/helper");
      const get = await request(server).delete("/1/helper");
      expect(get.body).toMatchObject({ message: "Deleted Successfully" });
    });
  });
});
