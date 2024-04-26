"use client";
import Loader from "@/app/components/loader";
import { Formschema } from "@/app/form-schema/category-schema";
import {
  useCreateCategoryMutation,
  useGetCategoryQuery,
} from "@/app/redux/api/category/category";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [newCategory] = useCreateCategoryMutation();
  const { isLoading, data } = useGetCategoryQuery();
  const formInitialValues = {
    title: "",
    description: "",
  };
  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema: Formschema,
    onSubmit: async (values) => {
      try {
        await toast.promise(newCategory(values), {
          loading: "Creating category...",
          success: "Category created successfully",
          error: "Failed to create category",
        });
        formik.resetForm();
      } catch (error) {
        console.error("Error creating category:", error);
      }
    },
  });

  return (
    <div className="flex gap-3 flex-col">
      <Toaster />
      <div className="flex-1">
        <h2 className="text-xl font-semibold">Manage Categories (3)</h2>
      </div>
      <div className="flex gap-3 ">
        <div className="w-2/3">
          <table className="border w-full">
            <thead>
              <tr className="bg-orange-200">
                <th className="border p-2">Id</th>
                <th className="border p-2">CatTitle</th>
                <th className="border p-2">CatDescription</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="p-3" colSpan={4}>
                    <div className="flex justify-center">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : (
                data?.map((cat, index) => (
                  <tr key={index} className="bg-slate-50">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{cat.title}</td>
                    <td className="border p-2">{cat.description}</td>
                    <td className="border p-2">
                      <form action="" method="POST">
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
                            className="w-6 h-6"
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
        <div className="w-1/3">
          <div className="bg-slate-50 shadow-lg border border-slate-200 p-2">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3 flex flex-col">
                <label htmlFor="catTitle">Category Title</label>
                <input
                  type="text"
                  id="catTitle"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  className="border px-3 py-2"
                />
                {<span className="text-red-600">{formik.errors.title}</span>}
              </div>
              <div className="mb-3 flex flex-col">
                <label htmlFor="catDesc">Category Description</label>
                <textarea
                  rows={7}
                  id="catDesc"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className="border px-3 py-2"
                ></textarea>
                {
                  <span className="text-red-600">
                    {formik.errors.description}
                  </span>
                }
              </div>
              <div className="mb-3 flex flex-col">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-teal-600 px-3 py-2 rounded-lg"
                >
                  Create Category
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
