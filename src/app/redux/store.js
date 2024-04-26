import { configureStore } from "@reduxjs/toolkit";
import { Product } from "./api/product/product";
import { category } from "./api/category/category";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productSlice } from "./slices/product";
import { auth } from "./api/auth/auth";

export const store = configureStore({
  reducer: {
    [Product.reducerPath]: Product.reducer,
    [category.reducerPath]: category.reducer,
    [auth.reducerPath]: auth.reducer,
    [productSlice.name]: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      Product.middleware,
      category.middleware,
      auth.middleware
    ),
});

setupListeners(store.dispatch);
export default store;
