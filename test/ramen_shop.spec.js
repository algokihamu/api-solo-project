const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const config = require("../knexfile");
const knex = require("knex")(config);

const { setupServer } = require("../src/server");
const { ramen_shop } = require("../src/data/ramen_shop_data.json");

const RAMEN_SHOP_TABLE = "ramen_shop";

chai.should();

const server = setupServer();
describe("customer", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

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

  describe("GET / -- Hello World", () => {
    it("should return all ramen shops", async () => {
      const res = await request.get("/");
      expect(res.text).to.equal("Hello World");
    });
  });

  describe("GET /shops -- getAll", () => {
    it("should return all ramen shops", async () => {
      const res = await request.get("/shops");

      JSON.parse(res.text).should.deep.equal(ramen_shop);
    });

    it("should return 3 ramen shops setting limit 3", async () => {
      const res = await request.get("/shops").query({ limit: 3 });
      JSON.parse(res.text).should.deep.equal(ramen_shop.slice(0, 3));
    });
  });
});
