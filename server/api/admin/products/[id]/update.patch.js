import { Product } from "~~/server/models/Product";
import { requireAdmin } from "~~/server/utils/requireAdmin";

export default defineEventHandler(async (event) => {
  const adminId = requireAdmin(event);
  if (!adminId) {
    return { success: false, message: "Access denied", statusCode: 403 };
  }

  const { id } = getRouterParams(event);
  const body = await readBody(event);

  const product = await Product.findByIdAndUpdate(id, body, { new: true });
  if (!product) {
    return { success: false, message: "Product not found", statusCode: 404 };
  }

  return { success: true, message: "Product updated", data: product };
});
