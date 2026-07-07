// // export const sizes = [

// //   {
// //     id: 1,
// //     name: "XS",
// //   },
// //   {
// //     id: 2,
// //     name: "S",
// //   },
// //   {
// //     id: 3,
// //     name: "M",
// //   },
// //   {
// //     id: 4,
// //     name: "L",
// //   },
// //   {
// //     id: 5,
// //     name: "XL",
// //   },
// //   {
// //     id: 6,
// //     name: "XXL",
// //   },
// // ];

// export const sizes = [
//   {
//     id: 1,
//     name: "XS",
//     slug: "xs",
//   },
//   {
//     id: 2,
//     name: "S",
//     slug: "s",
//   },
//   {
//     id: 3,
//     name: "M",
//     slug: "m",
//   },
//   {
//     id: 4,
//     name: "L",
//     slug: "l",
//   },
//   {
//     id: 5,
//     name: "XL",
//     slug: "xl",
//   },
//   {
//     id: 6,
//     name: "30",
//     slug: "30",
//   },
//   {
//     id: 7,
//     name: "32",
//     slug: "32",
//   },
//   {
//     id: 8,
//     name: "34",
//     slug: "34",
//   },
//   {
//     id: 9,
//     name: "36",
//     slug: "36",
//   },
// ];

const defaultSize = {
  isFeatured: false,
  isActive: true,
  createdAt: "2026-01-01",
  updatedAt: "2026-06-01",
};

const sizeList = [
  {
    name: "XS",
    slug: "xs",
    isFeatured: true,
  },
  {
    name: "S",
    slug: "s",
    isFeatured: false,
  },
  {
    name: "M",
    slug: "m",
    isFeatured: true,
  },
  {
    name: "L",
    slug: "l",
    isFeatured: true,
  },
  {
    name: "XL",
    slug: "xl",
    isFeatured: true,
  },
  {
    name: "XXL",
    slug: "xxl",
  },
  {
    name: "3XL",
    slug: "3xl",
  },
  {
    name: "28",
    slug: "28",
  },
  {
    name: "30",
    slug: "30",
  },
  {
    name: "32",
    slug: "32",
  },
  {
    name: "34",
    slug: "34",
  },
  {
    name: "36",
    slug: "36",
  },
  {
    name: "38",
    slug: "38",
  },
  {
    name: "40",
    slug: "40",
  },
  {
    name: "Free Size",
    slug: "free-size",
  },
];

export const sizes = sizeList.map((size, index) => ({
  id: index + 1,
  sortOrder: index + 1,
  ...defaultSize,
  ...size,
}));
