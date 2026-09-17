import { Order } from "~~/server/models/Order";
import { requireAuth } from "~~/server/utils/requireAuth";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  if (!userId) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  const { id } = getRouterParams(event);
  const body = await readBody(event);
  const { itemId, cancelReason } = body;

  const order = await Order.findOne({ _id: id, userId });
  if (!order) {
    return { success: false, message: "Order not found", statusCode: 404 };
  }

  const item = order.items.id(itemId);
  if (!item) {
    return { success: false, message: "Item not found", statusCode: 404 };
  }

  if (item.status !== "placed") {
    return {
      success: false,
      message: "This item cannot be cancelled",
      statusCode: 400,
    };
  }

  item.status = "cancelled";
  item.cancelReason = cancelReason;
  item.cancelledAt = new Date();

  await order.save();

  return { success: true, message: "Item cancelled", data: order };
});
