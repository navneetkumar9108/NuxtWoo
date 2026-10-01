import { getUserFromToken } from "./auth";

export function requireAdmin(event) {
  const decoded = getUserFromToken(event);
  if (!decoded || decoded.role !== "admin") {
    return null;
  }
  return decoded.userId;
}
