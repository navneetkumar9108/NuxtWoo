import { Address } from "~~/server/models/Address";
import { requireAuth } from "~~/server/utils/requireAuth";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  if (!userId) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  const body = await readBody(event);
  const {
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    country,
    type,
    isDefault,
  } = body;

  if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
    return {
      success: false,
      message: "Missing required fields",
      statusCode: 400,
    };
  }

  // Agar ye address default banaya ja raha hai, to baaki sab addresses ka isDefault false karo
  if (isDefault) {
    await Address.updateMany({ userId }, { isDefault: false });
  }

  const address = await Address.create({
    userId,
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    country,
    type,
    isDefault: isDefault || false,
  });

  return { success: true, message: "Address added", data: address };
});
