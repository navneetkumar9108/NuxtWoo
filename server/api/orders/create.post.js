import { Order } from "~~/server/models/Order";
import { Cart } from "~~/server/models/Cart";
import { Product } from "~~/server/models/Product";
import { Address } from "~~/server/models/Address";
import { requireAuth } from "~~/server/utils/requireAuth";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  if (!userId) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  const body = await readBody(event);
  const {
    addressId,
    paymentMethod = "cod",
    deliveryCharge = 0,
    discount = 0,
    itemIds,
  } = body;

  const cart = await Cart.findOne({ userId });
  if (!cart || cart.items.length === 0) {
    return { success: false, message: "Cart is empty", statusCode: 400 };
  }

  // Sirf selected itemIds process karo (agar diye hain)
  const itemsToOrder = itemIds?.length
    ? cart.items.filter((item) => itemIds.includes(item._id.toString()))
    : cart.items;

  if (!itemsToOrder.length) {
    return { success: false, message: "No items selected", statusCode: 400 };
  }

  const address = await Address.findOne({ _id: addressId, userId });
  if (!address) {
    return { success: false, message: "Address not found", statusCode: 404 };
  }

  const orderItems = [];
  let itemsTotal = 0;

  for (const item of itemsToOrder) {
    // ← cart.items ki jagah itemsToOrder
    const product = await Product.findById(item.productId);
    if (!product) {
      return {
        success: false,
        message: `Product not found: ${item.title}`,
        statusCode: 404,
      };
    }

    const color = product.colors.id(item.colorId);
    const size = color?.sizes.id(item.sizeId);

    if (!size || size.stock < item.quantity) {
      return {
        success: false,
        message: `Insufficient stock for ${item.title} (${item.sizeName})`,
        statusCode: 400,
      };
    }

    size.stock -= item.quantity;
    await product.save();

    orderItems.push({
      productId: item.productId,
      colorId: item.colorId,
      sizeId: item.sizeId,
      title: item.title,
      brandName: item.brandName,
      image: item.image,
      colorName: item.colorName,
      sizeName: item.sizeName,
      price: item.price,
      quantity: item.quantity,
    });

    itemsTotal += item.price * item.quantity;
  }

  const totalAmount = Math.max(0, itemsTotal + deliveryCharge - discount);

  const order = await Order.create({
    userId,
    items: orderItems,
    shippingAddress: {
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
    },
    itemsTotal,
    deliveryCharge,
    discount,
    totalAmount,
    paymentMethod,
  });

  // Sirf ordered items hi cart se hatao, baaki reh jayein
  cart.items = cart.items.filter(
    (item) =>
      !itemsToOrder.some((oi) => oi._id.toString() === item._id.toString()),
  );
  await cart.save();

  return { success: true, message: "Order placed successfully", data: order };
});
