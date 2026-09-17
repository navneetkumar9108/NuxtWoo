import { defineMongooseModel } from "#nuxt/mongoose";

export const Cart = defineMongooseModel(
  "Cart",
  {
    userId: { type: "ObjectId", ref: "User", required: true, unique: true },
    items: [
      {
        productId: { type: "ObjectId", ref: "Product", required: true },
        colorId: { type: "ObjectId", required: true },
        sizeId: { type: "ObjectId", required: true },

        // Snapshot data (taaki price/color change hone pe purana cart affected na ho)
        title: String,
        brandName: String,
        image: String,
        colorName: String,
        sizeName: String,
        price: Number,
        originalPrice: Number,
        discount: Number,

        quantity: { type: Number, default: 1, min: 1 },
      },
    ],
  },
  {
    timestamps: true,
  },
);
