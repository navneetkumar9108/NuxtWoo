// export const fits = [
//   {
//     id: 1,
//     name: "Regular",
//     slug: "regular",
//   },
//   {
//     id: 2,
//     name: "Oversized",
//     slug: "oversized",
//   },
//   {
//     id: 3,
//     name: "Slim",
//     slug: "slim",
//   },
//   {
//     id: 4,
//     name: "Relaxed",
//     slug: "relaxed",
//   },
//   {
//     id: 5,
//     name: "Skinny",
//     slug: "skinny",
//   },
//   {
//     id: 6,
//     name: "Tapered",
//     slug: "tapered",
//   },
// ];

const defaultFit = {
  isFeatured: false,
  isActive: true,
  createdAt: "2026-01-01",
  updatedAt: "2026-06-01",
};

const fitList = [
  {
    name: "Regular Fit",
    slug: "regular-fit",
    isFeatured: true,
  },
  {
    name: "Slim Fit",
    slug: "slim-fit",
    isFeatured: true,
  },
  {
    name: "Oversized Fit",
    slug: "oversized-fit",
    isFeatured: true,
  },
  {
    name: "Relaxed Fit",
    slug: "relaxed-fit",
  },
  {
    name: "Loose Fit",
    slug: "loose-fit",
  },
  {
    name: "Skinny Fit",
    slug: "skinny-fit",
  },
  {
    name: "Straight Fit",
    slug: "straight-fit",
  },
  {
    name: "Tapered Fit",
    slug: "tapered-fit",
  },
  {
    name: "Bootcut Fit",
    slug: "bootcut-fit",
  },
  {
    name: "Cargo Fit",
    slug: "cargo-fit",
  },
  {
    name: "Athletic Fit",
    slug: "athletic-fit",
  },
  {
    name: "Boxy Fit",
    slug: "boxy-fit",
  },
];

export const fits = fitList.map((fit, index) => ({
  id: index + 1,
  sortOrder: index + 1,
  ...defaultFit,
  ...fit,
}));
