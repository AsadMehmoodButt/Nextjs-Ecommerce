"use client";
import Loader from "@/app/components/loader";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "@/app/redux/api/product/product";
import {
  getProductFailure,
  getProductSuccess,
} from "@/app/redux/slices/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

const Page = () => {
  const { isLoading, error, data } = useGetProductQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(getProductSuccess(data));
    }
    if (error) {
      dispatch(getProductFailure(error.message));
    }
  }, [data, error, dispatch]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteProduct(id);
    toast.success("product deleted successfully");
  };
  return (
    <div className="flex gap-3 flex-col">
      <Toaster />
      <div className="flex-1 flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Manage Product ({data?.length})
        </h2>
        <Link
          href="/admin/books/addProduct"
          className="bg-teal-600 hover:bg-teal-800 text-white px-3 py-2 rounded"
        >
          Add Product
        </Link>
      </div>
      <div className="flex gap-3 ">
        <div className="w-full">
          <table className="border w-full">
            <thead>
              <tr className="bg-cyan-900 text-white">
                <th className="border p-2">Id</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Author</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="p-3" colSpan={8}>
                    <div className="flex justify-center">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : (
                data?.map((product, index) => (
                  <tr key={index} className="bg-slate-200 text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{product.title}</td>
                    <td className="border p-2">{product.author}</td>
                    <td className="border p-2">
                      {product.price} {product.discountPrice}
                    </td>
                    <td className="border p-2">{product.category}</td>
                    <td className="border p-2">
                      {product.status ? "Active" : "Inactive"}
                    </td>
                    <td className="border p-2">
                      <Image
                        height={50}
                        width={50}
                        className="object-cover"
                        src={`/uploads/${product.coverImage}`}
                        alt="product_image"
                      />
                    </td>
                    <td className="border p-2">
                      <form onSubmit={(e) => handleDelete(e, product._id)}>
                        <button
                          type="submit"
                          className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-800"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-3 h-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
