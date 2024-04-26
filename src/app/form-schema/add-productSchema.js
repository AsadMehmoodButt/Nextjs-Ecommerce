import * as yup from "yup";

export const ProductSchema = yup.object({
  title: yup
    .string()
    .min(3, "Too short")
    .max(20, "Too long")
    .required("Title is Required"),
  author: yup.string().min(3).max(20).required("Author is Required"),
  price: yup.number().min(3).max(20).required("Price is Required"),
  discount_price: yup
    .string()
    .min(3)
    .max(20)
    .required("Discount price is Required"),
  description: yup.string().min(3).max(20).required("Description is Required"),
});
