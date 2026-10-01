import { defineMongooseModel } from "#nuxt/mongoose";

export const User = defineMongooseModel(
  "User",
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String },
    gender: { type: String },
    dob: { type: String },
    location: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  },
);
