require(`dotenv`).config({ silent: true });

const request = require("supertest");
const express = require("express");

const db = require("../../database/dbConfig");
const router = require("./role-router");

const preLoadServer = () => {
  const server = express();
  server.use(express.json());
  server.use("/", router);
  return server;
};

describe("role-router.js", () => {
  beforeEach(async () => {
    await db("user_role").truncate();
    await db("users").truncate();
    await db("helpers_tickets").truncate();
    await db("tickets").truncate();
    await db("priorities").truncate();
    await db("ticket_status").truncate();
    await db("categories").truncate();
    await db("roles").truncate();
  });

  describe("post /api/roles", () => {
    it("should add a role", async () => {
      const server = await preLoadServer();
      const role = { role: "test" };
      const post = await request(server)
        .post("/")
        .send(role);
      expect(post.body.role).toMatchObject({ role: "test" });
    });
  });

  describe("get /api/roles", () => {
    it("should return a role from the database", async () => {
      const server = await preLoadServer();
      await request(server)
        .post("/")
        .send({ role: "test1" });
      const get = await request(server).get("/");
      expect(get.body.roles[0]).toMatchObject({ role: "test1" });
    });
  });

  describe("get /api/roles/:id", () => {
    it("should return a role id 1 from the database", async () => {
      const server = await preLoadServer();
      await request(server)
        .post("/")
        .send({ role: "test2" });
      const get = await request(server).get("/1");
      expect(get.body.roles).toMatchObject({ id: 1, role: "test2" });
    });
  });

  describe("put /api/roles/:id", () => {
    it("should update a role from the database", async () => {
      const server = await preLoadServer();
      await request(server)
        .post("/")
        .send({ role: "test3" });
      const get = await request(server)
        .put("/1")
        .send({
          role: "test33"
        });
      expect(get.body.role).toMatchObject({ id: 1, role: "test33" });
    });
  });

  describe("delete /api/roles", () => {
    it("should delete a role from the database", async () => {
      const server = await preLoadServer();
      await request(server)
        .post("/")
        .send({ role: "test" });
      const get = await request(server).delete("/1");
      expect(get.body).toMatchObject({ message: "Deleted Successfully" });
    });
  });
});
