import { Order } from "~~/server/models/Order";
import { requireAdmin } from "~~/server/utils/requireAdmin";

export default defineEventHandler(async (event) => {
  const adminId = requireAdmin(event);
  if (!adminId) {
    return { success: false, message: "Access denied", statusCode: 403 };
  }

  const { id } = getRouterParams(event);
  const body = await readBody(event);
  const { orderStatus } = body;

  const order = await Order.findByIdAndUpdate(
    id,
    { orderStatus },
    { new: true },
  );
  if (!order) {
    return { success: false, message: "Order not found", statusCode: 404 };
  }

  return { success: true, message: "Order status updated", data: order };
});
