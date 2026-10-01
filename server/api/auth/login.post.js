import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
      statusCode: 401,
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {
      success: false,
      message: "Invalid email or password",
      statusCode: 401,
    };
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  setCookie(event, "auth_token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return {
    success: true,
    message: "Logged in successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  };
});
