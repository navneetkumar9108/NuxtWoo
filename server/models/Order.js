import { defineMongooseModel } from "#nuxt/mongoose";

export const Order = defineMongooseModel(
  "Order",
  {
    userId: { type: "ObjectId", ref: "User", required: true },

    items: [
      {
        productId: { type: "ObjectId", ref: "Product", required: true },
        colorId: { type: "ObjectId", required: true },
        sizeId: { type: "ObjectId", required: true },

        title: String,
        brandName: String,
        image: String,
        colorName: String,
        sizeName: String,
        price: Number,
        quantity: Number,

        // Naye fields — per-item status tracking
        status: {
          type: String,
          enum: [
            "placed",
            "shipped",
            "delivered",
            "cancelled",
            "return_requested",
            "exchange_requested",
          ],
          default: "placed",
        },
        cancelReason: String,
        cancelledAt: Date,
        returnReason: String,
        returnType: { type: String, enum: ["return", "exchange"] },
        exchangeSizeId: { type: "ObjectId" },
        returnRequestedAt: Date,
      },
    ],

    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },

    itemsTotal: { type: Number, required: true },
    deliveryCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },

    paymentMethod: { type: String, enum: ["cod", "online"], default: "cod" },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["placed", "confirmed", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
  },
  {
    timestamps: true,
  },
);
