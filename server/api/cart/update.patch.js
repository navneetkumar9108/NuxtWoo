import { Cart } from "~~/server/models/Cart";
import { requireAuth } from "~~/server/utils/requireAuth";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  if (!userId) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  const body = await readBody(event);
  const { itemId, quantity } = body;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return { success: false, message: "Cart not found", statusCode: 404 };
  }

  const item = cart.items.id(itemId);
  if (!item) {
    return {
      success: false,
      message: "Item not found in cart",
      statusCode: 404,
    };
  }

  if (quantity < 1) {
    item.deleteOne();
  } else {
    item.quantity = quantity;
  }

  await cart.save();

  return { success: true, message: "Cart updated", data: cart };
});
