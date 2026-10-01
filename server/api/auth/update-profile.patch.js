import { User } from "~~/server/models/User";
import { getUserFromToken } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const decoded = getUserFromToken(event);
  if (!decoded) {
    return { success: false, message: "Please login first", statusCode: 401 };
  }

  const body = await readBody(event);
  const { name, phone, gender, dob, location } = body;

  const user = await User.findByIdAndUpdate(
    decoded.userId,
    { name, phone, gender, dob, location },
    { new: true },
  ).select("-password");

  if (!user) {
    return { success: false, message: "User not found", statusCode: 404 };
  }

  return { success: true, message: "Profile updated", data: user };
});
