"use client";
import { RegisterSchema } from "@/app/form-schema/user-schema";
import { useRegisterMutation } from "@/app/redux/api/auth/auth";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const page = () => {
  const [register, { data }] = useRegisterMutation();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        await toast.promise(register(values), {
          loading: "Registering User...",
          success: "User created successfully",
          error: (error) =>
            error?.response?.data?.message || "Failed to Register",
        });

        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="mt-10">
      <Toaster />
      <form
        className="max-w-sm mx-auto shadow-2xl p-10"
        onSubmit={formik.handleSubmit}
      >
        <h1
          className="text-3xl bg-slate-200 mb-4 font-mono text-center shadow-xl p-3"
          style={{ width: "400px", marginLeft: "-55px" }}
        >
          Register
        </h1>

        <div className="mb-5">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g: Asad Mehmood"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {<span className="text-red-600">{formik?.errors.name}</span>}
        </div>
        <div className="mb-5">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {<span className="text-red-600">{formik?.errors.email}</span>}
        </div>

        <div className="mb-5">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {<span className="text-red-600">{formik?.errors.password}</span>}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
        <div className="flex flex-col place-items-center gap-3 mt-4">
          <span className="bg-blue-600 font-semibold text-white p-1 px-10 rounded-full">
            Or continue with
          </span>
          <div className="flex justify-center gap-3">
            <button
              className="text-3xl"
              onClick={() => {
                signIn("github");
              }}
            >
              <FaGithub />
            </button>
            <button className="text-3xl text-yellow-500">
              <FcGoogle />
            </button>
            <button className="text-3xl text-blue-700">
              <FaFacebook />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
