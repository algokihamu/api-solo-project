const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);

const RAMEN_SHOP_TABLE = "ramen_shop";

describe("customer", () => {
  before(async () => {});

  after(async () => {});

  describe("setup", () => {
    it("should connect to database", () => {
      knex.raw("select 1 as result").catch(() => {
        assert.fail("unable to connect to database");
      });
    });

    it("has run the initial migration", () => {
      knex(RAMEN_SHOP_TABLE)
        .select()
        .catch(() => assert.fail("ramen_shop table is not found."));
    });
  });
});
