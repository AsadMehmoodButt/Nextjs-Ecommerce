import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const Product = createApi({
  reducerPath: "Product",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXTAUTH_UTL,
  }),

  tagTypes: ["product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => {
        console.log("this is entered data ",data);
        return {
          url: "/api/product",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
    getProduct: builder.query({
      query: () => ({
        url: "/api/product",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getProductDetail: builder.query({
      query: (productId) => {
        return {
          url: `/api/product/${productId}`,
          method: "GET",
        };
      },
    }),
    deleteProduct: builder.mutation({
      query: (productId) => {
        return {
          url: `/api/product/${productId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductQuery,
  useDeleteProductMutation,
  useGetProductDetailQuery,
} = Product;
export const { endpoints } = Product;
