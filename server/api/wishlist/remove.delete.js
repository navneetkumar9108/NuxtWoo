import { Wishlist } from "~~/server/models/Wishlist";
import { requireAuth } from "~~/server/utils/requireAuth";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  if (!userId) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  const body = await readBody(event);
  const { itemId } = body;

  const wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    return { success: false, message: "Wishlist not found", statusCode: 404 };
  }

  const item = wishlist.items.id(itemId);
  if (!item) {
    return { success: false, message: "Item not found", statusCode: 404 };
  }

  item.deleteOne();
  await wishlist.save();

  return { success: true, message: "Removed from wishlist", data: wishlist };
});
