import { Cart } from "~~/server/models/Cart";
import { requireAuth } from "~~/server/utils/requireAuth";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  if (!userId) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = { items: [] };
  }

  return { success: true, data: cart };
});
