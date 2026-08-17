import { productsV4 } from "../data/data";

export default defineEventHandler(() => {
  const genders = [
    ...new Map(
      productsV4.map((product) => [product.gender.slug, product.gender]),
    ).values(),
  ];

  return successResponse(genders, "Categories fetched successfully");
});
