"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { LoginSchema } from "@/app/form-schema/user-schema";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Loader from "@/app/components/loader";

const LoginPage = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  // if isAuthenticated donot go to login page redirect to home
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    } else {
      router.replace("/auth/login");
    }
  }, [sessionStatus, router]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.error) toast.error("invalid email or password");
      if (res?.url) {
        toast.success("login successfully");
        router.replace("/");
      }
    },
  });
  if (sessionStatus === "loading") {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    sessionStatus !== "authenticated" && (
      <div className="mt-10">
        <Toaster />
        <form
          className="max-w-sm mx-auto shadow-2xl p-10"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-3xl bg-slate-100 mb-4 font-mono text-center shadow-lg p-3">
            Login
          </h1>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="e.g: abutt1508@gmail.com"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {<span className="text-red-600">{formik?.errors.email}</span>}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="*******"
            />
            {<span className="text-red-600">{formik?.errors.password}</span>}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <div className="flex flex-col place-items-center gap-3 mt-4">
            <span className="bg-blue-600 font-semibold text-white p-1 px-10 rounded-full">
              Or continue with
            </span>
            <div className="flex justify-center gap-1">
              <button
                className="text-2xl border border-slate-300 p-1 px-10"
                onClick={() => {
                  signIn("github");
                }}
              >
                <FaGithub />
              </button>
              <button
                className="text-2xl border border-slate-300 p-1 px-10"
                onClick={() => {
                  signIn("google");
                }}
              >
                <FcGoogle />
              </button>
              <button className="text-2xl text-blue-700 border border-slate-300 p-1 px-10">
                <FaFacebook />
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  );
};

export default LoginPage;
