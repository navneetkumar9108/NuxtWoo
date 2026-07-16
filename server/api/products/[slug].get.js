import { productsV4 } from "~~/server/data/data";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler((event) => {
  const { slug } = getRouterParams(event);
  // console.log("slug :", slug);
  // const product = productsV3.find((item) => item.slug === slug);
  const product = productsV4.find((item) => item.slug === slug);
  // console.log("product value", product);
  if (!product) {
    // setResponseStatus(event, 404);

    return errorResponse("Product not found", 404);
  }
  // const enrichedProduct = enrichProduct(product);

  // const relatedProducts = getRelatedProducts(product);

  // return successResponse(
  //   {
  //     product,
  //     relatedProducts,
  //   },
  //   "Product fetched successfully",
  // );
  // return successResponse(enrichedProduct, "Product fetched successfully");
  return successResponse(product, "Product fetched successfully");
});
