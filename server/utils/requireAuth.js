import { getUserFromToken } from "./auth";

export function requireAuth(event) {
  const decoded = getUserFromToken(event);
  if (!decoded) {
    return null;
  }
  return decoded.userId;
}
