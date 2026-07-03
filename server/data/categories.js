// export const categories = [
//   {
//     id: 1,
//     name: "Men T-Shirts",
//     slug: "men-t-shirts",
//   },
//   {
//     id: 2,
//     name: "Women T-Shirts",
//     slug: "women-t-shirts",
//   },
//   {
//     id: 3,
//     name: "Shirts",
//     slug: "shirts",
//   },
//   {
//     id: 4,
//     name: "Jeans",
//     slug: "jeans",
//   },
//   {
//     id: 5,
//     name: "Hoodies",
//     slug: "hoodies",
//   },
//   {
//     id: 6,
//     name: "Sweatshirts",
//     slug: "sweatshirts",
//   },
//   {
//     id: 7,
//     name: "Jackets",
//     slug: "jackets",
//   },
//   {
//     id: 8,
//     name: "Polo T-Shirts",
//     slug: "polo-t-shirts",
//   },
//   {
//     id: 9,
//     name: "Joggers",
//     slug: "joggers",
//   },
//   {
//     id: 10,
//     name: "Shorts",
//     slug: "shorts",
//   },
//   {
//     id: 11,
//     name: "Accessories",
//     slug: "accessories",
//   },
// ];

const defaultCategory = {
  isFeatured: false,
  isActive: true,
  createdAt: "2026-01-01",
  updatedAt: "2026-06-01",
};

const categoryList = [
  {
    name: "Men T-Shirts",
    slug: "men-t-shirts",
    image: "/categories/men-t-shirts.webp",
  },
  {
    name: "Women T-Shirts",
    slug: "women-t-shirts",
    image: "/categories/women-t-shirts.webp",
  },
  {
    name: "Shirts",
    slug: "shirts",
    image: "/categories/shirts.webp",
  },
  {
    name: "Jeans",
    slug: "jeans",
    image: "/categories/jeans.webp",
  },
  {
    name: "Hoodies",
    slug: "hoodies",
    image: "/categories/hoodies.webp",
  },
  {
    name: "Sweatshirts",
    slug: "sweatshirts",
    image: "/categories/sweatshirts.webp",
  },
  {
    name: "Jackets",
    slug: "jackets",
    image: "/categories/jackets.webp",
  },
  {
    name: "Polo T-Shirts",
    slug: "polo-t-shirts",
    image: "/categories/polo-t-shirts.webp",
  },
  {
    name: "Joggers",
    slug: "joggers",
    image: "/categories/joggers.webp",
  },
  {
    name: "Shorts",
    slug: "shorts",
    image: "/categories/shorts.webp",
  },
  {
    name: "Track Pants",
    slug: "track-pants",
    image: "/categories/track-pants.webp",
  },
  {
    name: "Cargo Pants",
    slug: "cargo-pants",
    image: "/categories/cargo-pants.webp",
  },
  {
    name: "Casual Trousers",
    slug: "casual-trousers",
    image: "/categories/casual-trousers.webp",
  },
  {
    name: "Formal Trousers",
    slug: "formal-trousers",
    image: "/categories/formal-trousers.webp",
  },
  {
    name: "Co-ord Sets",
    slug: "co-ord-sets",
    image: "/categories/co-ord-sets.webp",
  },
  {
    name: "Sweaters",
    slug: "sweaters",
    image: "/categories/sweaters.webp",
  },
  {
    name: "Blazers",
    slug: "blazers",
    image: "/categories/blazers.webp",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "/categories/accessories.webp",
  },
];

export const categories = categoryList.map((category, index) => ({
  id: index + 1,
  sortOrder: index + 1,
  ...defaultCategory,
  ...category,
}));
