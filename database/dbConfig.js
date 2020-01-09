const knex = require("knex");

const knexConfig = require("../knexfile.js");

console.log(process.env.DB_ENV);

const environment = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[environment]);
