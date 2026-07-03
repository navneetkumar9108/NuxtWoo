import { products } from "../../data/products";
import { getRelatedProducts } from "../../utils/product";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler((event) => {
  const { slug } = getRouterParams(event);

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    setResponseStatus(event, 404);

    return errorResponse("Product not found", 404);
  }

  const relatedProducts = getRelatedProducts(product);

  return successResponse(
    {
      product,
      relatedProducts,
    },
    "Product fetched successfully",
  );
});
