import { Cart } from "~~/server/models/Cart";
import { Product } from "~~/server/models/Product";
import { requireAuth } from "~~/server/utils/requireAuth";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  if (!userId) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  const body = await readBody(event);
  const { productId, colorId, sizeId, quantity = 1 } = body;

  const product = await Product.findById(productId);
  if (!product) {
    return { success: false, message: "Product not found", statusCode: 404 };
  }

  const color = product.colors.id(colorId);
  if (!color) {
    return { success: false, message: "Color not found", statusCode: 404 };
  }

  const size = color.sizes.id(sizeId);
  if (!size) {
    return { success: false, message: "Size not found", statusCode: 404 };
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) =>
      item.productId.toString() === productId &&
      item.colorId.toString() === colorId &&
      item.sizeId.toString() === sizeId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      colorId,
      sizeId,
      title: product.title,
      brandName: product.brand?.name,
      image: color.thumbnail,
      colorName: color.name,
      sizeName: size.name,
      price: color.pricing.price,
      originalPrice: color.pricing.originalPrice,
      discount: color.pricing.discount,
      quantity,
    });
  }

  await cart.save();

  return { success: true, message: "Item added to cart", data: cart };
});
