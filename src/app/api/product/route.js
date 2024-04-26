import ConnectDb from "@/app/config/db-conn";
import product from "@/app/models/book";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import Categor from "@/app/models/category";

export const POST = async (req) => {
  ConnectDb();
  try {
    const data = await req.formData();
    const coverImage = data.get("cover_image");
    const title = data.get("title");
    const discountPrice = data.get("discount_price");
    const price = data.get("price");
    const author = data.get("author");
    const description = data.get("description");
    const categoryName = data.get("category");

    // Find the corresponding category document by name
    const category = await Categor.findOne({ title: categoryName });

    if (!category) {
      throw new Error(`Category with name '${categoryName}' not found.`);
    }

    const byteData = await coverImage.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./public/uploads/${coverImage.name}`;
    await writeFile(path, buffer);

    const response = await product.create({
      title,
      discountPrice,
      price,
      author,
      description,
      category: category._id, 
      coverImage: coverImage.name,
      status: true,
    });

    return NextResponse.json({
      message: "Product created successfully",
      data: response,
    });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
};

export async function GET() {
  ConnectDb();
  try {
    const response = await product.find();
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}

