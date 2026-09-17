import { defineMongooseModel } from "#nuxt/mongoose";

export const Product = defineMongooseModel(
  "Product",
  {
    sku: { type: String, required: true, unique: true }, // style-level, e.g. BWK-MARVEL-TS-001
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },

    brand: { name: String, slug: String },
    category: { name: String, slug: { type: String, index: true } },
    gender: { name: String, slug: String },
    material: { name: String, slug: String },
    fit: { name: String, slug: String },

    colors: [
      {
        sku: { type: String, required: true, unique: true }, // BWK-MARVEL-TS-001-BLK
        name: String,
        hex: String,
        slug: String,
        thumbnail: String,
        images: [String],
        sizes: [
          {
            sku: { type: String, required: true, unique: true }, // BWK-MARVEL-TS-001-BLK-M
            name: String,
            slug: String,
            stock: { type: Number, default: 0 },
          },
        ],
        pricing: {
          price: { type: Number, required: true },
          originalPrice: Number,
          discount: Number,
        },
      },
    ],

    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },

    shortDescription: String,
    description: String,
    highlights: [String],
    specifications: { type: Object },
    tags: { type: [String], index: true },

    isNew: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  },
);
