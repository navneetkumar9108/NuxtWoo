// export const materials = [
//   {
//     id: 1,
//     name: "Cotton",
//     slug: "cotton",
//   },
//   {
//     id: 2,
//     name: "Cotton Blend",
//     slug: "cotton-blend",
//   },
//   {
//     id: 3,
//     name: "Polyester",
//     slug: "polyester",
//   },
//   {
//     id: 4,
//     name: "Denim",
//     slug: "denim",
//   },
//   {
//     id: 5,
//     name: "Linen",
//     slug: "linen",
//   },
// ];

const defaultMaterial = {
  isFeatured: false,
  isActive: true,
  createdAt: "2026-01-01",
  updatedAt: "2026-06-01",
};

const materialList = [
  {
    name: "100% Cotton",
    slug: "100-cotton",
    isFeatured: true,
  },
  {
    name: "Cotton Blend",
    slug: "cotton-blend",
    isFeatured: true,
  },
  {
    name: "Organic Cotton",
    slug: "organic-cotton",
  },
  {
    name: "Polyester",
    slug: "polyester",
  },
  {
    name: "Poly Cotton",
    slug: "poly-cotton",
  },
  {
    name: "Denim",
    slug: "denim",
    isFeatured: true,
  },
  {
    name: "Linen",
    slug: "linen",
  },
  {
    name: "Linen Blend",
    slug: "linen-blend",
  },
  {
    name: "Viscose",
    slug: "viscose",
  },
  {
    name: "Rayon",
    slug: "rayon",
  },
  {
    name: "Fleece",
    slug: "fleece",
  },
  {
    name: "French Terry",
    slug: "french-terry",
  },
  {
    name: "Corduroy",
    slug: "corduroy",
  },
  {
    name: "Leather",
    slug: "leather",
  },
  {
    name: "PU Leather",
    slug: "pu-leather",
  },
];

export const materials = materialList.map((material, index) => ({
  id: index + 1,
  sortOrder: index + 1,
  ...defaultMaterial,
  ...material,
}));
