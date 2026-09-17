import { Address } from "~~/server/models/Address";
import { requireAuth } from "~~/server/utils/requireAuth";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  if (!userId) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  const body = await readBody(event);
  const { addressId, ...updates } = body;

  const address = await Address.findOne({ _id: addressId, userId });
  if (!address) {
    return { success: false, message: "Address not found", statusCode: 404 };
  }

  if (updates.isDefault) {
    await Address.updateMany({ userId }, { isDefault: false });
  }

  Object.assign(address, updates);
  await address.save();

  return { success: true, message: "Address updated", data: address };
});
