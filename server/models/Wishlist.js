import { defineMongooseModel } from "#nuxt/mongoose";

export const Wishlist = defineMongooseModel(
  "Wishlist",
  {
    userId: { type: "ObjectId", ref: "User", required: true, unique: true },
    items: [
      {
        productId: { type: "ObjectId", ref: "Product", required: true },
        colorId: { type: "ObjectId", required: true },

        // Snapshot data
        title: String,
        brandName: String,
        image: String,
        colorName: String,
        price: Number,
        originalPrice: Number,
        discount: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);
