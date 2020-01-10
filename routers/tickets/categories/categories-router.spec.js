require(`dotenv`).config({ silent: true });

const request = require("supertest");
const express = require("express");

const db = require("../../../database/dbConfig");
const router = require("./categories-router");

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

  describe("post /api/tickets/categories", () => {
    it("should add a category", async () => {
      const server = preLoadServer();
      const category = { category: "test" };
      const post = await request(server)
        .post("/")
        .send(category);
      expect(post.body.category).toMatchObject({ category: "test" });
    });
  });

  describe("get /api/tickets/categories", () => {
    it("should return a category from the database", async () => {
      const server = preLoadServer();
      await request(server)
        .post("/")
        .send({ category: "test1" });
      const get = await request(server).get("/");
      expect(get.body.categories[0]).toMatchObject({
        category: "test1"
      });
    });
  });

  describe("get /api/tickets/categories/:id", () => {
    it("should return a category id 1 from the database", async () => {
      const server = preLoadServer();
      await request(server)
        .post("/")
        .send({ category: "test2" });
      const get = await request(server).get("/1");
      expect(get.body.category).toMatchObject({
        id: 1,
        category: "test2"
      });
    });
  });

  describe("put /api/tickets/categories/:id", () => {
    it("should update a category from the database", async () => {
      const server = preLoadServer();
      await request(server)
        .post("/")
        .send({ category: "test3" });
      const get = await request(server)
        .put("/1")
        .send({
          category: "test33"
        });
      expect(get.body.category).toMatchObject({ id: 1, category: "test33" });
    });
  });

  describe("delete /api/tickets/categories", () => {
    it("should delete a category from the database", async () => {
      const server = preLoadServer();
      await request(server)
        .post("/")
        .send({ category: "test" });
      const get = await request(server).delete("/1");
      expect(get.body).toMatchObject({ message: "Deleted Successfully" });
    });
  });
});
