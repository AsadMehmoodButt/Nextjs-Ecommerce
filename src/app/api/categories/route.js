import ConnectDb from "@/app/config/db-conn";
import category from "@/app/models/category";
import { NextResponse } from "next/server";

export async function POST(req) {
  ConnectDb();
  try {
    const data = await req.json();
    const response = await category.create(data);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}
export async function GET() {
  ConnectDb();
  try {
    const response = await category.find();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}