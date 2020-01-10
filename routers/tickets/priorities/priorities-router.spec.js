require(`dotenv`).config({ silent: true });

const request = require("supertest");
const express = require("express");

const db = require("../../../database/dbConfig");
const router = require("./priorities-router");

const preLoadServer = () => {
  const server = express();
  server.use(express.json());
  server.use("/", router);
  return server;
};

describe("category-router.js", () => {
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

  describe("post /api/tickets/priorities", () => {
    it("should add a priority", async () => {
      const server = preLoadServer();
      const priority = { name: "post", level: 2 };
      const post = await request(server)
        .post("/")
        .send(priority);
      expect(post.body.priority).toMatchObject({
        id: 1,
        level: 2,
        name: "post"
      });
    });
  });

  describe("get /api/tickets/priorities", () => {
    it("should return categories from the database", async () => {
      const server = preLoadServer();
      await request(server)
        .post("/")
        .send({ name: "post", level: 2 });
      const get = await request(server).get("/");
      expect(get.body.priorities[0]).toMatchObject({
        id: 1,
        level: 2,
        name: "post"
      });
    });
  });
});
