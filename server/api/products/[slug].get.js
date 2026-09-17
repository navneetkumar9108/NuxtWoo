import { Product } from "~~/server/models/Product";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event);
  const product = await Product.findOne({ slug }).lean();
  if (!product) {
    return errorResponse("Product not found", 404);
  }
  // const enrichedProduct = enrichProduct(product);

  return successResponse(product, "Product fetched successfully");
});
