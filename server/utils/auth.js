import jwt from "jsonwebtoken";

export function getUserFromToken(event) {
  const token = getCookie(event, "auth_token");
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}
