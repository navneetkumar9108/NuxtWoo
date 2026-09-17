import { Wishlist } from "~~/server/models/Wishlist";
import { Product } from "~~/server/models/Product";
import { requireAuth } from "~~/server/utils/requireAuth";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  if (!userId) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  const body = await readBody(event);
  const { productId, colorId } = body;

  const product = await Product.findById(productId);
  if (!product) {
    return { success: false, message: "Product not found", statusCode: 404 };
  }

  const color = product.colors.id(colorId);
  if (!color) {
    return { success: false, message: "Color not found", statusCode: 404 };
  }

  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = new Wishlist({ userId, items: [] });
  }

  const alreadyExists = wishlist.items.some(
    (item) =>
      item.productId.toString() === productId &&
      item.colorId.toString() === colorId,
  );

  if (alreadyExists) {
    return { success: true, message: "Already in wishlist", data: wishlist };
  }

  wishlist.items.push({
    productId,
    colorId,
    title: product.title,
    brandName: product.brand?.name,
    image: color.thumbnail,
    colorName: color.name,
    price: color.pricing.price,
    originalPrice: color.pricing.originalPrice,
    discount: color.pricing.discount,
  });

  await wishlist.save();

  return { success: true, message: "Added to wishlist", data: wishlist };
});
