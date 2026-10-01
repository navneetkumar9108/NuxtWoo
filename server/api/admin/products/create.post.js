import { Product } from "~~/server/models/Product";
import { requireAdmin } from "~~/server/utils/requireAdmin";

export default defineEventHandler(async (event) => {
  const adminId = requireAdmin(event);
  if (!adminId) {
    return { success: false, message: "Access denied", statusCode: 403 };
  }

  const body = await readBody(event);

  const existing = await Product.findOne({
    $or: [{ sku: body.sku }, { slug: body.slug }],
  });
  if (existing) {
    return {
      success: false,
      message: "SKU or Slug already exists",
      statusCode: 409,
    };
  }

  const product = await Product.create(body);

  return { success: true, message: "Product created", data: product };
});
