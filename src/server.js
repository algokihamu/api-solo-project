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

  app.post("/shops", async (req, res) => {
    const new_shop = req.body;
    const id = await knex(RAMEN_SHOP_TABLE)
      .insert({
        name: new_shop.name,
        city: new_shop.city,
        region: new_shop.region,
        address: new_shop.address,
        tel_number: new_shop.tel_number,
        postal_code: new_shop.postal_code,
      })
      .returning("id");
    res.status(201).send(id);
  });

  app.patch("/shops/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const update_param = req.body;

    let result;
    if (isNaN(id)) {
      result = 0;
    } else {
      result = await knex(RAMEN_SHOP_TABLE)
        .where("id", id)
        .update(update_param);
    }
    res.status(200).send({ count: result });
  });

  app.delete("/shops/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    let result;
    if (isNaN(id)) {
      result = 0;
    } else {
      result = await knex(RAMEN_SHOP_TABLE).where("id", id).delete();
    }
    res.status(200).send({ count: result });
  });

  return app;
};

module.exports = { setupServer };
