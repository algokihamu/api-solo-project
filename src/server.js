const express = require("express");
const knex = require("./knex");

const RAMEN_SHOP_TABLE = "ramen_shop";

const setupServer = () => {
  const app = express();
  app.use(express.json());
  //app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.get("/shops", async (req, res) => {
    const limit = parseInt(req.query.limit);
    let result;
    if (isNaN(limit)) {
      result = await knex(RAMEN_SHOP_TABLE).select();
    } else {
      result = await knex(RAMEN_SHOP_TABLE).select().limit(limit);
    }
    res.status(200).send(result);
  });

  app.get("/shops/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    let result;
    if (isNaN(id)) {
      result = [];
    } else {
      result = await knex(RAMEN_SHOP_TABLE).where("id", id).select();
    }
    res.status(200).send(result);
  });

  return app;
};

module.exports = { setupServer };
