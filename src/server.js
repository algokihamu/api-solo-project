const express = require("express");
const { default: knex } = require("knex");
const app = express();
const port = 3000;

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/", (req, res) => {
  //    return knex.select({*}).from(a);
});

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
