// export default defineEventHandler(() => {
//   return {
//     success: true,
//     message: "Product fetched successfully",
//     data: {
//       products: [
//         {
//           id: 1,
//           title: "Marvel Graphic Printed Oversized T-Shirt",
//           brand: "The Souled Store",
//           category: {
//             id: 1,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 999,
//           originalPrice: 1499,
//           discount: 33,
//           rating: 4.6,
//           ratingCount: 1248,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753182778_9462560.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753182778_7660356.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: false,
//           wishlist: false,
//           stock: 18,
//         },
//         {
//           id: 2,
//           title: "Naruto Oversized Cotton T-Shirt",
//           brand: "The Souled Store",
//           category: {
//             id: 2,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 1099,
//           originalPrice: 1599,
//           discount: 31,
//           rating: 4.8,
//           ratingCount: 932,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1777614898_6251629.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1777614898_3742323.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: true,
//           wishlist: false,
//           stock: 12,
//         },
//         {
//           id: 3,
//           title: "Solid Relaxed Fit T-Shirt",
//           brand: "Nike",
//           category: {
//             id: 3,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 899,
//           originalPrice: 1399,
//           discount: 36,
//           rating: 4.5,
//           ratingCount: 678,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1724217971_8522039.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1724217971_6279411.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: false,
//           wishlist: true,
//           stock: 25,
//         },
//         {
//           id: 4,
//           title: "Typography Printed T-Shirt",
//           brand: "Puma",
//           category: {
//             id: 4,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 799,
//           originalPrice: 1299,
//           discount: 38,
//           rating: 4.4,
//           ratingCount: 482,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1740063500_4663070.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1740063500_8837993.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: false,
//           wishlist: false,
//           stock: 14,
//         },
//         {
//           id: 5,
//           title: "Premium Cotton Crew Neck T-Shirt",
//           brand: "Adidas",
//           category: {
//             id: 5,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 1199,
//           originalPrice: 1799,
//           discount: 33,
//           rating: 4.7,
//           ratingCount: 1540,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1745911503_2109432.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1745911503_7354605.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: true,
//           wishlist: false,
//           stock: 20,
//         },
//         {
//           id: 6,
//           title: "Graphic Printed Casual T-Shirt",
//           brand: "HRX",
//           category: {
//             id: 6,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 749,
//           originalPrice: 1199,
//           discount: 38,
//           rating: 4.3,
//           ratingCount: 401,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1746297227_6892711.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1730456115_9435317.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: false,
//           wishlist: false,
//           stock: 17,
//         },
//         {
//           id: 7,
//           title: "Minimal Logo T-Shirt",
//           brand: "Levi's",
//           category: {
//             id: 7,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 1299,
//           originalPrice: 1999,
//           discount: 35,
//           rating: 4.9,
//           ratingCount: 2104,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1780488960_1344867.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1780488960_7504455.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: true,
//           wishlist: true,
//           stock: 10,
//         },
//         {
//           id: 8,
//           title: "Classic Regular Fit T-Shirt",
//           brand: "Bewakoof",
//           category: {
//             id: 8,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 699,
//           originalPrice: 999,
//           discount: 30,
//           rating: 2.2,
//           ratingCount: 356,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1730456115_7540225.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1752216270_1880849.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: false,
//           wishlist: false,
//           stock: 28,
//         },
//         {
//           id: 9,
//           title: "Printed Oversized Cotton Tee",
//           brand: "Roadster",
//           category: {
//             id: 9,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 849,
//           originalPrice: 1399,
//           discount: 39,
//           rating: 4.5,
//           ratingCount: 715,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1764827995_1100518.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1764827995_9279207.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: false,
//           wishlist: false,
//           stock: 21,
//         },
//         {
//           id: 10,
//           title: "Dragon Ball Z Printed T-Shirt",
//           brand: "The Souled Store",
//           category: {
//             id: 10,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 1099,
//           originalPrice: 1699,
//           discount: 35,
//           rating: 4.8,
//           ratingCount: 1872,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1778847792_9705789.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1778847792_2180173.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: true,
//           wishlist: false,
//           stock: 11,
//         },
//         {
//           id: 11,
//           title: "Tokyo Drift Oversized T-Shirt",
//           brand: "The Souled Store",
//           category: {
//             id: 11,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 999,
//           originalPrice: 1499,
//           discount: 33,
//           rating: 4.7,
//           ratingCount: 1164,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1781767379_8910860.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1781767379_2810870.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: false,
//           wishlist: false,
//           stock: 18,
//         },
//         {
//           id: 12,
//           title: "Classic Cotton Printed Tee",
//           brand: "Puma",
//           category: {
//             id: 12,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 849,
//           originalPrice: 1299,
//           discount: 35,
//           rating: 4.3,
//           ratingCount: 542,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1765613743_6061017.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1781767270_8341288.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: false,
//           wishlist: true,
//           stock: 26,
//         },
//         {
//           id: 13,
//           title: "Relaxed Fit Graphic Tee",
//           brand: "Nike",
//           category: {
//             id: 13,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 1199,
//           originalPrice: 1799,
//           discount: 33,
//           rating: 4.8,
//           ratingCount: 1738,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1782119477_9944480.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1782119477_9363294.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: true,
//           wishlist: false,
//           stock: 15,
//         },
//         {
//           id: 14,
//           title: "Minimal Logo Cotton T-Shirt",
//           brand: "Adidas",
//           category: {
//             id: 14,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 1099,
//           originalPrice: 1699,
//           discount: 35,
//           rating: 4.6,
//           ratingCount: 1385,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1781693235_9329608.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1781693235_1160540.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: true,
//           wishlist: false,
//           stock: 13,
//         },
//         {
//           id: 15,
//           title: "Everyday Crew Neck T-Shirt",
//           brand: "Levi's",
//           category: {
//             id: 15,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 899,
//           originalPrice: 1399,
//           discount: 36,
//           rating: 4.4,
//           ratingCount: 726,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1781524233_9248425.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753182778_9462560.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: false,
//           wishlist: false,
//           stock: 22,
//         },
//         {
//           id: 16,
//           title: "Marvel Hero Printed T-Shirt",
//           brand: "The Souled Store",
//           category: {
//             id: 16,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 1049,
//           originalPrice: 1599,
//           discount: 34,
//           rating: 4.8,
//           ratingCount: 1850,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753182778_7660356.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1777614898_6251629.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: true,
//           wishlist: true,
//           stock: 12,
//         },
//         {
//           id: 17,
//           title: "Casual Oversized Graphic Tee",
//           brand: "Roadster",
//           category: {
//             id: 17,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 799,
//           originalPrice: 1199,
//           discount: 33,
//           rating: 4.2,
//           ratingCount: 465,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1724217971_8522039.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1740063500_4663070.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: false,
//           wishlist: false,
//           stock: 31,
//         },
//         {
//           id: 18,
//           title: "Premium Heavyweight T-Shirt",
//           brand: "HRX",
//           category: {
//             id: 18,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 1299,
//           originalPrice: 1899,
//           discount: 32,
//           rating: 4.9,
//           ratingCount: 2145,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1745911503_2109432.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1746297227_6892711.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: true,
//           wishlist: false,
//           stock: 8,
//         },
//         {
//           id: 19,
//           title: "Printed Summer Cotton Tee",
//           brand: "Bewakoof",
//           category: {
//             id: 19,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 749,
//           originalPrice: 1099,
//           discount: 32,
//           rating: 4.3,
//           ratingCount: 589,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1730456115_9435317.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1780488960_1344867.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: false,
//           wishlist: false,
//           stock: 19,
//         },
//         {
//           id: 20,
//           title: "Anime Collection Oversized T-Shirt",
//           brand: "The Souled Store",
//           category: {
//             id: 20,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 1149,
//           originalPrice: 1699,
//           discount: 32,
//           rating: 4.8,
//           ratingCount: 2438,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1778847792_9705789.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1781767379_8910860.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: true,
//           wishlist: false,
//           stock: 10,
//         },
//         {
//           id: 21,
//           title: "Vintage Washed Oversized T-Shirt",
//           brand: "Nike",
//           category: {
//             id: 21,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 949,
//           originalPrice: 1499,
//           discount: 37,
//           rating: 4.6,
//           ratingCount: 1028,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1781767270_3354268.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1782119477_9363294.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: false,
//           wishlist: false,
//           stock: 16,
//         },
//         {
//           id: 22,
//           title: "Urban Street Graphic Tee",
//           brand: "Puma",
//           category: {
//             id: 22,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 849,
//           originalPrice: 1299,
//           discount: 35,
//           rating: 4.4,
//           ratingCount: 648,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1781693235_9329608.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1781693235_1160540.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: false,
//           wishlist: true,
//           stock: 23,
//         },
//         {
//           id: 23,
//           title: "Batman Printed Oversized T-Shirt",
//           brand: "The Souled Store",
//           category: {
//             id: 23,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 1099,
//           originalPrice: 1699,
//           discount: 35,
//           rating: 4.9,
//           ratingCount: 2845,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753182778_9462560.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753182778_7660356.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: true,
//           wishlist: false,
//           stock: 9,
//         },
//         {
//           id: 24,
//           title: "Premium Cotton Casual Tee",
//           brand: "Adidas",
//           category: {
//             id: 24,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 1199,
//           originalPrice: 1799,
//           discount: 33,
//           rating: 4.7,
//           ratingCount: 1342,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1740063500_4663070.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1740063500_8837993.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: true,
//           wishlist: false,
//           stock: 18,
//         },
//         {
//           id: 25,
//           title: "Tokyo Anime Printed Tee",
//           brand: "The Souled Store",
//           category: {
//             id: 25,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 999,
//           originalPrice: 1499,
//           discount: 33,
//           rating: 4.8,
//           ratingCount: 1765,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1777614898_6251629.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1777614898_3742323.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: true,
//           wishlist: false,
//           stock: 14,
//         },
//         {
//           id: 26,
//           title: "Solid Everyday Cotton T-Shirt",
//           brand: "Levi's",
//           category: {
//             id: 26,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 899,
//           originalPrice: 1399,
//           discount: 36,
//           rating: 4.5,
//           ratingCount: 812,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1724217971_8522039.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1724217971_6279411.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: false,
//           wishlist: true,
//           stock: 27,
//         },
//         {
//           id: 27,
//           title: "Relaxed Fit Printed T-Shirt",
//           brand: "Roadster",
//           category: {
//             id: 27,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 799,
//           originalPrice: 1199,
//           discount: 33,
//           rating: 4.2,
//           ratingCount: 455,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1764827995_1100518.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1764827995_9279207.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: false,
//           wishlist: false,
//           stock: 34,
//         },
//         {
//           id: 28,
//           title: "Marvel Universe Graphic Tee",
//           brand: "The Souled Store",
//           category: {
//             id: 28,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 1149,
//           originalPrice: 1699,
//           discount: 32,
//           rating: 4.9,
//           ratingCount: 3258,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1780488960_1344867.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1780488960_7504455.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: true,
//           wishlist: false,
//           stock: 11,
//         },
//         {
//           id: 29,
//           title: "Essential Cotton Crew Neck",
//           brand: "HRX",
//           category: {
//             id: 29,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 749,
//           originalPrice: 1099,
//           discount: 32,
//           rating: 4.3,
//           ratingCount: 601,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1745911503_2109432.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1745911503_7354605.jpg?w=300&dpr=1",
//           isNew: false,
//           isBestSeller: false,
//           wishlist: false,
//           stock: 21,
//         },
//         {
//           id: 30,
//           title: "Dragon Ball Oversized Graphic T-Shirt",
//           brand: "The Souled Store",
//           category: {
//             id: 30,
//             name: "Men T-Shirts",
//             slug: "men-t-shirts",
//           },
//           price: 1199,
//           originalPrice: 1799,
//           discount: 33,
//           rating: 5.0,
//           ratingCount: 4128,
//           thumbnail:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1778847792_9705789.jpg?w=300&dpr=1",
//           hoverImage:
//             "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1778847792_2180173.jpg?w=300&dpr=1",
//           isNew: true,
//           isBestSeller: true,
//           wishlist: false,
//           stock: 7,
//         },
//       ],
//       pagination: {
//         page: 1,
//         limit: 12,
//         totalProducts: 30,
//         totalPages: 3,
//       },
//     },
//   };
// });

import { productsV3 } from "../../data/productsV3";
import { successResponse } from "../../utils/response";
import { filterProducts } from "../../utils/filter";
import { searchProducts } from "../../utils/search";
import { sortProducts } from "../../utils/sort";
import { paginate } from "../../utils/pagination";

export default defineEventHandler((event) => {
  const query = getQuery(event);

  let result = productsV3;

  result = filterProducts(result, query);
  result = searchProducts(result, query.search);
  console.log(
    "Before sort",
    result.slice(0, 5).map((p) => p.id),
  );
  result = sortProducts(result, query.sort);
  console.log(
    "After sort",
    result.slice(0, 5).map((p) => p.id),
  );
  const paginated = paginate(result, query.page, query.limit);
  console.log("query:", query);
  console.log("Sort Query Api:", query.sort);
  return successResponse(
    paginated.items,
    "Products fetched successfully",
    paginated.meta,
  );
});
