import { Address } from "~~/server/models/Address";
import { requireAuth } from "~~/server/utils/requireAuth";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  if (!userId) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  const addresses = await Address.find({ userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });

  return { success: true, data: addresses };
});
