import mongoose from "mongoose";
import Category from "./category";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: Category }, // Reference to the Category model
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    status: { type: Boolean, default: true },
    coverImage: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
