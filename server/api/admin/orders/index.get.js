import { Order } from "~~/server/models/Order";
import { requireAdmin } from "~~/server/utils/requireAdmin";

export default defineEventHandler(async (event) => {
  const adminId = requireAdmin(event);
  if (!adminId) {
    return { success: false, message: "Access denied", statusCode: 403 };
  }

  const orders = await Order.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  return { success: true, data: orders };
});
