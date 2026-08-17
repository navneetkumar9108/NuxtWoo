import { productsV4 } from "../data/data";

export default defineEventHandler(() => {
  const brands = [
    ...new Map(
      productsV4.map((product) => [product.brand.slug, product.brand]),
    ).values(),
  ];

  return successResponse(brands, "brands fetched successfully");
});
