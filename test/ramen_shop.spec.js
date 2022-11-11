const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;
const config = require("../knexfile");
const knex = require("knex")(config);

const { setupServer } = require("../src/server");
const { ramen_shop } = require("../src/data/ramen_shop_data.json");

const RAMEN_SHOP_TABLE = "ramen_shop";

const server = setupServer();
describe("ramen_shop", () => {
  let request;

  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
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
        id: 6,
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

      JSON.parse(res2.text)[0].should.deep.equal(new_shop);
    });
  });

  describe("PATCH /shops/:id -- update ramen shop details", () => {
    it("should return update id:1 ramen shop postal_code", async () => {
      const id = 1;
      const update_param = {
        postal_code: "999-9999",
      };
      const res = await request.patch(`/shops/${id}`).send(update_param);

      res.should.have.status(200);
      JSON.parse(res.text)["count"].should.deep.equal(1);

      request = chai.request(server);
      const res2 = await request.get(`/shops/${id}`);
      JSON.parse(res2.text)[0]["postal_code"].should.deep.equal(
        update_param["postal_code"]
      );
    });
  });

  describe("DELETE /shops/:id -- delete ramen shop record", () => {
    it("should return delete id:1 ramen shop", async () => {
      const id = 1;
      const res = await request.delete(`/shops/${id}`);

      res.should.have.status(200);
      JSON.parse(res.text)["count"].should.deep.equal(1);

      request = chai.request(server);
      const res2 = await request.get(`/shops/${id}`);
      expect(res2.text).to.deep.equal("[]");
    });
  });
});
