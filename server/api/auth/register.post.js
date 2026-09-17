import bcrypt from "bcryptjs";
import { User } from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password, phone, gender, dob, location } = body;

  if (!name || !email || !password) {
    return {
      success: false,
      message: "Name, email, and password are required",
      statusCode: 400,
    };
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return {
      success: false,
      message: "Email already exists",
      statusCode: 409,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    gender,
    dob,
    location,
  });

  return {
    success: true,
    message: "Registered successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  };
});
