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

  describe("GET /shops/:id -- getById", () => {
    it("should return id:1 ramen shops", async () => {
      const res = await request.get("/shops/1");
      JSON.parse(res.text).should.deep.equal(ramen_shop.slice(0, 1));
    });
  });

  describe("POST /shops -- insert new ramen shop", () => {
    it("should return new ramen shop id", async () => {
      const new_shop = {
        name: "味玉",
        city: "神奈川県",
        region: "横浜市",
        address: "横浜市南区浦舟町2-22",
        tel_number: "045-251-3628",
        postal_code: "232-0024",
      };
      const res = await request.post("/shops").send(new_shop);
      const id = JSON.parse(res.text)[0]["id"];

      res.should.have.status(201);

      request = chai.request(server);
      const res2 = await request.get(`/shops/${id}`);

      JSON.parse(res2.text)[0]["name"].should.deep.equal(new_shop["name"]);
      JSON.parse(res2.text)[0]["city"].should.deep.equal(new_shop["city"]);
      JSON.parse(res2.text)[0]["region"].should.deep.equal(new_shop["region"]);
      JSON.parse(res2.text)[0]["address"].should.deep.equal(
        new_shop["address"]
      );
      JSON.parse(res2.text)[0]["tel_number"].should.deep.equal(
        new_shop["tel_number"]
      );
      JSON.parse(res2.text)[0]["postal_code"].should.deep.equal(
        new_shop["postal_code"]
      );
    });
  });
});
