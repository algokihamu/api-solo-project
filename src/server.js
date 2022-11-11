const { application } = require("express");
const express = require("express");
const { default: knex } = require("knex");

const port = 3000;

const setupServer = () => {
  const app = express();
  app.use(express.json);
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.get("/", (req, res) => {
    //    return knex.select({*}).from(a);
  });

  return app;
};

module.exports = { setupServer };
