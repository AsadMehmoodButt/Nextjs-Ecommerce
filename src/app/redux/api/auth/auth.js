import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXTAUTH_UTL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => {
        return {
          url: "api/auth/register",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useRegisterMutation } = auth;
export const { endpoints } = auth;
