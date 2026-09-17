import { Product } from "~~/server/models/Product";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const product = await Product.findById(id).lean();

  if (!product) {
    return { success: false, message: "Product not found", statusCode: 404 };
  }

  return { success: true, data: product };
});
