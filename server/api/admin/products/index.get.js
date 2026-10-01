import { Product } from "~~/server/models/Product";
import { requireAdmin } from "~~/server/utils/requireAdmin";

export default defineEventHandler(async (event) => {
  const adminId = requireAdmin(event);
  if (!adminId) {
    return { success: false, message: "Access denied", statusCode: 403 };
  }

  const products = await Product.find().sort({ createdAt: -1 });

  return { success: true, data: products };
});
