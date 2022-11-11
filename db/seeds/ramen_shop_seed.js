/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("ramen_shop").del();
  await knex("ramen_shop").insert([
    {
      id: 1,
      name: "吉村家",
      city: "神奈川県",
      region: "横浜市",
      address: "横浜市西区南幸2-12-6 ストークミキ１F",
      tel_number: "045-322-9988",
      postal_code: "220-0005",
    },
    {
      id: 2,
      name: "壱八家弘明寺店",
      city: "神奈川県",
      region: "横浜市",
      address: "横浜市南区弘明寺267-3-5",
      tel_number: "",
      postal_code: "232-0067",
    },
    {
      id: 3,
      name: "琉二家",
      city: "神奈川県",
      region: "横浜市",
      address: "横浜市南区大橋町3-66",
      tel_number: "045-512-1649",
      postal_code: "232-0054",
    },
    {
      id: 4,
      name: "荻原屋",
      city: "神奈川県",
      region: "横浜市",
      address: "横浜市南区六ツ川1-10",
      tel_number: "",
      postal_code: "232-0066",
    },
    {
      id: 5,
      name: "萩原家",
      city: "神奈川県",
      region: "横浜市",
      address: "横浜市南区六ツ川1-50",
      tel_number: "",
      postal_code: "232-0066",
    },
  ]);
};
