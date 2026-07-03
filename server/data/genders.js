// export const genders = [
//   {
//     id: 1,
//     name: "Men",
//     slug: "men",
//   },
//   {
//     id: 2,
//     name: "Women",
//     slug: "women",
//   },
//   {
//     id: 3,
//     name: "Unisex",
//     slug: "unisex",
//   },
// ];

const defaultGender = {
  isFeatured: false,
  isActive: true,
  createdAt: "2026-01-01",
  updatedAt: "2026-06-01",
};

const genderList = [
  {
    name: "Men",
    slug: "men",
    isFeatured: true,
  },
  {
    name: "Women",
    slug: "women",
    isFeatured: true,
  },
  {
    name: "Unisex",
    slug: "unisex",
    isFeatured: true,
  },
  {
    name: "Boys",
    slug: "boys",
  },
  {
    name: "Girls",
    slug: "girls",
  },
  {
    name: "Kids",
    slug: "kids",
  },
];

export const genders = genderList.map((gender, index) => ({
  id: index + 1,
  sortOrder: index + 1,
  ...defaultGender,
  ...gender,
}));
