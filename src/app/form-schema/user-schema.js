import * as yup from "yup";

export const RegisterSchema = yup.object({
  name: yup
    .string()
    .min(3, "Too short")
    .max(20, "Too long")
    .required("Title is Required"),
  email: yup.string().min(3).email().required("Email is Required"),
  password: yup.number().min(3).required("Password is Required"),
});
export const LoginSchema = yup.object({
  email: yup.string().min(3).email().required("Email is Required"),
  password: yup.number().min(3).required("Password is Required"),
});
