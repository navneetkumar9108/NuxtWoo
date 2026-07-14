// import { categories } from "../data/categories";

// export default defineEventHandler(() => {
//   return successResponse(categories);
// });

import { productsV4 } from "../data/data";

export default defineEventHandler(() => {
  const categories = [
    ...new Map(
      productsV4.map((product) => [product.category.slug, product.category]),
    ).values(),
  ];

  return successResponse(categories, "Categories fetched successfully");
});
