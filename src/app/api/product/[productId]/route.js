import ConnectDb from "@/app/config/db-conn";
import { NextResponse } from "next/server";
import Product from "@/app/models/book";

export async function DELETE(_, { params }) {
  ConnectDb();
  try {
    const id = params.productId;
    const response = await Product.findByIdAndDelete(id);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
export async function GET(_, { params }) {
  ConnectDb();
  try {
    const id = params.productId;
    const response = await Product.findById(id);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
