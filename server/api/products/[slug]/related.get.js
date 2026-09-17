import { productsV4 } from "~~/server/data/data";
import { successResponse, errorResponse } from "~~/server/utils/response";

export default defineEventHandler((event) => {
  const { slug } = getRouterParams(event);

  const product = productsV4.find((item) => item.slug === slug);

  if (!product) {
    return errorResponse("Product not found", 404);
  }
  const relatedProducts = productsV4
    .filter(
      (item) =>
        item.category.id === product.category.id && item.id !== product.id,
    )
    .slice(0, 4);

  return successResponse(
    relatedProducts,
    "Related products fetched successfully",
  );
});
