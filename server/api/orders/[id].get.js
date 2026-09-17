import { Order } from "~~/server/models/Order";
import { requireAuth } from "~~/server/utils/requireAuth";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  if (!userId) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  const { id } = getRouterParams(event);
  const order = await Order.findOne({ _id: id, userId });

  if (!order) {
    return { success: false, message: "Order not found", statusCode: 404 };
  }

  return { success: true, data: order };
});
