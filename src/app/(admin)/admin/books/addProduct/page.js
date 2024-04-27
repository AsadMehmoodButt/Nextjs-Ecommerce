"use client";
import { ProductSchema } from "@/app/form-schema/add-productSchema";
import { useGetCategoryQuery } from "@/app/redux/api/category/category";
import { useCreateProductMutation } from "@/app/redux/api/product/product";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const { isLoading, isError, error, data } = useGetCategoryQuery();
  const [createProduct] = useCreateProductMutation();
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [selectedValue, setSelectValue] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      price: "",
      discount_price: "",
      description: "",
    },
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("cover_image", avatar);
        formData.append("title", values.title);
        formData.append("author", values.author);
        formData.append("price", values.price);
        formData.append("discount_price", values.discount_price);
        formData.append("category", selectedValue);
        formData.append("description", values.description);

        toast.promise(createProduct(formData), {
          loading: "Creating product...",
          success: "Product created successfully",
          error: "Failed to create product",
        });

        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setAvatar(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex flex-col">
      <Toaster />
      <div className="flex-1 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Add Product (3)</h2>
        <Link
          href="/admin/books"
          className="bg-teal-600 hover:bg-teal-800 text-white px-3 py-2 rounded"
        >
          Go back
        </Link>
      </div>
      <div className="flex flex-1 justify-center">
        <div className="w-full mt-3">
          <div className="bg-slate-50 shadow-lg border border-slate-200 p-2">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex gap-3">
                <div className="mb-3 flex flex-col flex-1">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="border px-3 py-2"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                  {<span className="text-red-600">{formik?.errors.title}</span>}
                </div>
                <div className="mb-3 flex flex-col flex-1">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    className="border px-3 py-2"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                  />
                  {
                    <span className="text-red-600">
                      {formik?.errors.author}
                    </span>
                  }
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mb-3 flex flex-col flex-1">
                  <label htmlFor="price">price</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    className="border px-3 py-2"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                  />
                  {<span className="text-red-600">{formik?.errors.price}</span>}
                </div>
                <div className="mb-3 flex flex-col flex-1">
                  <label htmlFor="discount_price">discount price</label>
                  <input
                    type="text"
                    id="discount_price"
                    name="discount_price"
                    className="border px-3 py-2"
                    value={formik.values.discount_price}
                    onChange={formik.handleChange}
                  />
                  {
                    <span className="text-red-600">
                      {formik?.errors.discount_price}
                    </span>
                  }
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mb-3 flex flex-col flex-1">
                  <label htmlFor="category">category</label>
                  <select
                    id="category"
                    name="category"
                    className="border px-3 py-2"
                    onChange={(e) => setSelectValue(e.target.value)}
                  >
                    <option value="" key="">
                      select category
                    </option>
                    {data?.map((categ, i) => (
                      <option key={i}>{categ.title}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 flex flex-col flex-1">
                  <label htmlFor="cover_image">image</label>
                  <input
                    type="file"
                    id="cover_image"
                    name="cover_image"
                    className="border px-3 py-2"
                    onChange={handleFileChange}
                  />
                  <div>
                    <img src={avatarPreview} width={80} alt="" />
                  </div>
                </div>
              </div>
              <div className="mb-3 flex flex-col">
                <label htmlFor="decsription">Description</label>
                <textarea
                  rows={7}
                  id="decsription"
                  name="description"
                  value={formik?.values.description}
                  onChange={formik?.handleChange}
                  className="border px-3 py-2"
                ></textarea>
                {
                  <span className="text-red-600">
                    {formik?.errors.description}
                  </span>
                }
              </div>
              <div className="mb-3 flex flex-col">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-teal-600 px-3 py-2 rounded-lg"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
