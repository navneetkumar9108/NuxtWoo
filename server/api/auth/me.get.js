import { User } from "~~/server/models/User";
import { getUserFromToken } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const decoded = getUserFromToken(event);
  if (!decoded) {
    return { success: false, message: "Not logged in", statusCode: 401 };
  }

  const user = await User.findById(decoded.userId).select("-password");
  if (!user) {
    return { success: false, message: "User not found", statusCode: 404 };
  }

  return { success: true, data: user };
});
