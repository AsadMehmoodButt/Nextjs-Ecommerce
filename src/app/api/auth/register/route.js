import Connectdbs from "@/app/config/db-conn";
import user from "@/app/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  Connectdbs();
  const { name, email, password } = await req.json();

  const existingUser = await user.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "Email already in use" },
      { status: 409 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new user({ name, email, password: hashedPassword });
  try {
    await newUser.save();
    return NextResponse.json("User Registered", { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
};
