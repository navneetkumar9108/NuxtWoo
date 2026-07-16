import { productsV4 } from "~~/server/data/data";
import { successResponse, errorResponse } from "~~/server/utils/response";

export default defineEventHandler((event) => {
  const { slug } = getRouterParams(event);

  const product = productsV4.find((item) => item.slug === slug);

  if (!product) {
    return errorResponse("Product not found", 404);
  }
  // console.log("Current Product:", product);
  const relatedProducts = productsV4
    .filter(
      (item) =>
        item.category.id === product.category.id && item.id !== product.id,
    )
    .slice(0, 4);

  // const relatedProducts = productsV3
  //   .filter(
  //     (item) =>
  //       item.categoryId === product.categoryId && item.id !== product.id,
  //   )
  //   .slice(0, 4)
  //   .map(enrichProduct);

  // console.log(
  //   "Related Products:",
  //   relatedProducts.map((p) => ({
  //     id: p.id,
  //     categoryId: p.categoryId,
  //   })),
  // );

  return successResponse(
    relatedProducts,
    "Related products fetched successfully",
  );
});
