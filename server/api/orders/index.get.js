import { Order } from "~~/server/models/Order";
import { requireAuth } from "~~/server/utils/requireAuth";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  if (!userId) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  const orders = await Order.find({ userId }).sort({ createdAt: -1 });

  return { success: true, data: orders };
});
