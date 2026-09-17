import { Wishlist } from "~~/server/models/Wishlist";
import { requireAuth } from "~~/server/utils/requireAuth";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  if (!userId) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = { items: [] };
  }

  return { success: true, data: wishlist };
});
