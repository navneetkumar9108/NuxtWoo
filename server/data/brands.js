// export const brands = [
//   {
//     id: 1,
//     name: "The Souled Store",
//     slug: "the-souled-store",
//     logo: "/brands/the-souled-store.svg",
//   },
//   {
//     id: 2,
//     name: "Bewakoof",
//     slug: "bewakoof",
//     logo: "/brands/bewakoof.svg",
//   },
//   {
//     id: 3,
//     name: "Snitch",
//     slug: "snitch",
//     logo: "/brands/snitch.svg",
//   },
//   {
//     id: 4,
//     name: "Roadster",
//     slug: "roadster",
//     logo: "/brands/roadster.svg",
//   },
//   {
//     id: 5,
//     name: "HRX",
//     slug: "hrx",
//     logo: "/brands/hrx.svg",
//   },
//   {
//     id: 6,
//     name: "Levi's",
//     slug: "levis",
//     logo: "/brands/levis.svg",
//   },
//   {
//     id: 7,
//     name: "H&M",
//     slug: "hm",
//     logo: "/brands/hm.svg",
//   },
//   {
//     id: 8,
//     name: "Jack & Jones",
//     slug: "jack-and-jones",
//     logo: "/brands/jack-jones.svg",
//   },
//   {
//     id: 9,
//     name: "Puma",
//     slug: "puma",
//     logo: "/brands/puma.svg",
//   },
//   {
//     id: 10,
//     name: "Tommy Hilfiger",
//     slug: "tommy-hilfiger",
//     logo: "/brands/tommy.svg",
//   },
//   {
//     id: 11,
//     name: "U.S. Polo Assn.",
//     slug: "us-polo-assn",
//     logo: "/brands/uspa.svg",
//   },
//   {
//     id: 12,
//     name: "Adidas",
//     slug: "adidas",
//     logo: "/brands/adidas.svg",
//   },
//   {
//     id: 13,
//     name: "Nike",
//     slug: "nike",
//     logo: "/brands/nike.svg",
//   },
//   {
//     id: 14,
//     name: "Allen Solly",
//     slug: "allen-solly",
//     logo: "/brands/allen-solly.svg",
//   },
//   {
//     id: 15,
//     name: "Rare Rabbit",
//     slug: "rare-rabbit",
//     logo: "/brands/rare-rabbit.svg",
//   },
//   {
//     id: 16,
//     name: "Flying Machine",
//     slug: "flying-machine",
//     logo: "/brands/flying-machine.svg",
//   },
//   {
//     id: 17,
//     name: "Wrogn",
//     slug: "wrogn",
//     logo: "/brands/wrogn.svg",
//   },
//   {
//     id: 18,
//     name: "Highlander",
//     slug: "highlander",
//     logo: "/brands/highlander.svg",
//   },
//   {
//     id: 19,
//     name: "Mast & Harbour",
//     slug: "mast-harbour",
//     logo: "/brands/mast-harbour.svg",
//   },
//   {
//     id: 20,
//     name: "Celio",
//     slug: "celio",
//     logo: "/brands/celio.svg",
//   },
//   {
//     id: 21,
//     name: "Pepe Jeans",
//     slug: "pepe-jeans",
//     logo: "/brands/pepe-jeans.svg",
//   },
//   {
//     id: 22,
//     name: "Spykar",
//     slug: "spykar",
//     logo: "/brands/spykar.svg",
//   },
//   {
//     id: 23,
//     name: "Van Heusen",
//     slug: "van-heusen",
//     logo: "/brands/van-heusen.svg",
//   },
//   {
//     id: 24,
//     name: "Arrow",
//     slug: "arrow",
//     logo: "/brands/arrow.svg",
//   },
//   {
//     id: 25,
//     name: "Louis Philippe",
//     slug: "louis-philippe",
//     logo: "/brands/louis-philippe.svg",
//   },
//   {
//     id: 26,
//     name: "GAP",
//     slug: "gap",
//     logo: "/brands/gap.svg",
//   },
//   {
//     id: 27,
//     name: "Superdry",
//     slug: "superdry",
//     logo: "/brands/superdry.svg",
//   },
//   {
//     id: 28,
//     name: "USPA Denim",
//     slug: "uspa-denim",
//     logo: "/brands/uspa-denim.svg",
//   },
//   {
//     id: 29,
//     name: "Being Human",
//     slug: "being-human",
//     logo: "/brands/being-human.svg",
//   },
//   {
//     id: 30,
//     name: "Campus Sutra",
//     slug: "campus-sutra",
//     logo: "/brands/campus-sutra.svg",
//   },
// ];

const defaultBrand = {
  isFeatured: false,
  isActive: true,
  createdAt: "2026-01-01",
  updatedAt: "2026-06-01",
};

const brandList = [
  {
    name: "The Souled Store",
    slug: "the-souled-store",
    logo: "/brands/the-souled-store.svg",
    isFeatured: true,
  },
  {
    name: "Bewakoof",
    slug: "bewakoof",
    logo: "/brands/bewakoof.svg",
    isFeatured: true,
  },
  {
    name: "Snitch",
    slug: "snitch",
    logo: "/brands/snitch.svg",
  },
  {
    name: "Roadster",
    slug: "roadster",
    logo: "/brands/roadster.svg",
  },
  {
    name: "HRX",
    slug: "hrx",
    logo: "/brands/hrx.svg",
  },
  {
    name: "Levi's",
    slug: "levis",
    logo: "/brands/levis.svg",
    isFeatured: true,
  },
  {
    name: "H&M",
    slug: "hm",
    logo: "/brands/hm.svg",
  },
  {
    name: "Jack & Jones",
    slug: "jack-and-jones",
    logo: "/brands/jack-jones.svg",
  },
  {
    name: "Puma",
    slug: "puma",
    logo: "/brands/puma.svg",
    isFeatured: true,
  },
  {
    name: "Tommy Hilfiger",
    slug: "tommy-hilfiger",
    logo: "/brands/tommy.svg",
  },
  {
    name: "U.S. Polo Assn.",
    slug: "us-polo-assn",
    logo: "/brands/uspa.svg",
  },
  {
    name: "Adidas",
    slug: "adidas",
    logo: "/brands/adidas.svg",
    isFeatured: true,
  },
  {
    name: "Nike",
    slug: "nike",
    logo: "/brands/nike.svg",
    isFeatured: true,
  },
  {
    name: "Allen Solly",
    slug: "allen-solly",
    logo: "/brands/allen-solly.svg",
  },
  {
    name: "Rare Rabbit",
    slug: "rare-rabbit",
    logo: "/brands/rare-rabbit.svg",
  },
  {
    name: "Flying Machine",
    slug: "flying-machine",
    logo: "/brands/flying-machine.svg",
  },
  {
    name: "Wrogn",
    slug: "wrogn",
    logo: "/brands/wrogn.svg",
  },
  {
    name: "Highlander",
    slug: "highlander",
    logo: "/brands/highlander.svg",
  },
  {
    name: "Mast & Harbour",
    slug: "mast-harbour",
    logo: "/brands/mast-harbour.svg",
  },
  {
    name: "Celio",
    slug: "celio",
    logo: "/brands/celio.svg",
  },
  {
    name: "Pepe Jeans",
    slug: "pepe-jeans",
    logo: "/brands/pepe-jeans.svg",
  },
  {
    name: "Spykar",
    slug: "spykar",
    logo: "/brands/spykar.svg",
  },
  {
    name: "Van Heusen",
    slug: "van-heusen",
    logo: "/brands/van-heusen.svg",
  },
  {
    name: "Arrow",
    slug: "arrow",
    logo: "/brands/arrow.svg",
  },
  {
    name: "Louis Philippe",
    slug: "louis-philippe",
    logo: "/brands/louis-philippe.svg",
  },
  {
    name: "GAP",
    slug: "gap",
    logo: "/brands/gap.svg",
  },
  {
    name: "Superdry",
    slug: "superdry",
    logo: "/brands/superdry.svg",
  },
  {
    name: "USPA Denim",
    slug: "uspa-denim",
    logo: "/brands/uspa-denim.svg",
  },
  {
    name: "Being Human",
    slug: "being-human",
    logo: "/brands/being-human.svg",
  },
  {
    name: "Campus Sutra",
    slug: "campus-sutra",
    logo: "/brands/campus-sutra.svg",
  },
];

export const brands = brandList.map((brand, index) => ({
  id: index + 1,
  sortOrder: index + 1,
  ...defaultBrand,
  ...brand,
}));
