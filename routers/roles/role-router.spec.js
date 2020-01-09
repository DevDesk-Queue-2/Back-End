require(`dotenv`).config({ silent: true });

const request = require("supertest");
const express = require("express");

const db = require("../../database/dbConfig");
const router = require("./role-router");

describe("role-router.js", () => {
  beforeEach(async () => {
    await db("roles").del();
  });

  describe("post /api/roles", () => {
    it("should add a role", async () => {
      const server = express();
      server.use(express.json());
      server.use("/", router);
      const role = { role: "test" };
      const post = await request(server)
        .post("/")
        .send(role);
      expect(post.body.role).toMatchObject({ role: "test" });
    });
  });

  describe("get /api/roles", () => {
    it("should return a role from the database", async () => {
      const server = express();
      server.use(express.json());
      server.use("/", router);
      await request(server)
        .post("/")
        .send({ role: "test" });
      const get = await request(server).get("/");
      expect(get.body.roles[0]).toMatchObject({ role: "test" });
    });
  });
});
