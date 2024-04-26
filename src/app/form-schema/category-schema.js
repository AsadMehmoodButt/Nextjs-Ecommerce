import * as yup from "yup";

export const Formschema = yup.object({
  title: yup.string().min(3, "Too short").max(20).required("Title is Required"),
  description: yup.string().min(3).max(20).required("Description is Required"),
});
