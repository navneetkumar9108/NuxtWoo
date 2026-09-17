import { defineMongooseModel } from "#nuxt/mongoose";

export const Address = defineMongooseModel(
  "Address",
  {
    userId: { type: "ObjectId", ref: "User", required: true },

    fullName: { type: String, required: true },
    phone: { type: String, required: true },

    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: "India" },

    type: { type: String, enum: ["home", "work", "other"], default: "home" },
    isDefault: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
