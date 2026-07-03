// export const colors = [
//   {
//     id: 1,
//     name: "Black",
//     hex: "#000000",
//     slug: "black",
//   },
//   {
//     id: 2,
//     name: "White",
//     hex: "#FFFFFF",
//     slug: "white",
//   },
//   {
//     id: 3,
//     name: "Grey",
//     hex: "#808080",
//     slug: "grey",
//   },
//   {
//     id: 4,
//     name: "Blue",
//     hex: "#2563EB",
//     slug: "blue",
//   },
//   {
//     id: 5,
//     name: "Green",
//     hex: "#16A34A",
//     slug: "green",
//   },
//   {
//     id: 6,
//     name: "Navy",
//     hex: "#1E3A8A",
//     slug: "navy",
//   },
//   {
//     id: 7,
//     name: "Maroon",
//     hex: "#7F1D1D",
//     slug: "maroon",
//   },
//   {
//     id: 8,
//     name: "Beige",
//     hex: "#D6C7A1",
//     slug: "beige",
//   },
//   {
//     id: 9,
//     name: "Sky Blue",
//     hex: "#38BDF8",
//     slug: "sky-blue",
//   },
//   {
//     id: 10,
//     name: "Light Pink",
//     hex: "#F9A8D4",
//     slug: "light-pink",
//   },
// ];
const defaultColor = {
  isFeatured: false,
  isActive: true,
  createdAt: "2026-01-01",
  updatedAt: "2026-06-01",
};

const colorList = [
  {
    name: "Black",
    slug: "black",
    hex: "#000000",
    isFeatured: true,
  },
  {
    name: "White",
    slug: "white",
    hex: "#FFFFFF",
    isFeatured: true,
  },
  {
    name: "Grey",
    slug: "grey",
    hex: "#808080",
  },
  {
    name: "Navy Blue",
    slug: "navy-blue",
    hex: "#1E3A8A",
  },
  {
    name: "Blue",
    slug: "blue",
    hex: "#2563EB",
  },
  {
    name: "Sky Blue",
    slug: "sky-blue",
    hex: "#38BDF8",
  },
  {
    name: "Red",
    slug: "red",
    hex: "#DC2626",
  },
  {
    name: "Maroon",
    slug: "maroon",
    hex: "#7F1D1D",
  },
  {
    name: "Green",
    slug: "green",
    hex: "#16A34A",
  },
  {
    name: "Olive",
    slug: "olive",
    hex: "#556B2F",
  },
  {
    name: "Yellow",
    slug: "yellow",
    hex: "#FACC15",
  },
  {
    name: "Orange",
    slug: "orange",
    hex: "#F97316",
  },
  {
    name: "Purple",
    slug: "purple",
    hex: "#7C3AED",
  },
  {
    name: "Pink",
    slug: "pink",
    hex: "#EC4899",
  },
  {
    name: "Brown",
    slug: "brown",
    hex: "#8B4513",
  },
  {
    name: "Beige",
    slug: "beige",
    hex: "#D6C7A1",
  },
  {
    name: "Cream",
    slug: "cream",
    hex: "#FFFDD0",
  },
  {
    name: "Khaki",
    slug: "khaki",
    hex: "#C3B091",
  },
];

export const colors = colorList.map((color, index) => ({
  id: index + 1,
  sortOrder: index + 1,
  ...defaultColor,
  ...color,
}));
