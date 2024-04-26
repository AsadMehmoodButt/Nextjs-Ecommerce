import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Product = createApi({
  reducerPath: "Product",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),

  tagTypes: ["product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => {
        console.log("this is RTK Data ", data);
        return {
          url: "api/product",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
    getProduct: builder.query({
      query: () => ({
        url: "api/product",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getProductDetail: builder.query({
      query: (productId) => {
        console.log("this is RTK product ID ", productId);
        return {
          url: `api/product/${productId}`,
          method: "GET",
        };
      },
      // providesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => {
        console.log("this is product ID 2", productId);
        return {
          url: `api/product/${productId}`,
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
