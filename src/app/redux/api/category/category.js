import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const category = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXTAUTH_UTL,
  }),

  tagTypes: ["category"],
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "api/categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["category"],
    }),
    getCategory: builder.query({
      query: () => ({
        url: "api/categories",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoryQuery } = category;
export const {
  endpoints: { getCategory, createCategory },
} = category;
