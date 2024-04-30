import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {},
    status: "idle",
    error: null,
  },
  reducers: {
    getProductSuccess: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    },
    getProductFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { getProductSuccess, getProductFailure } = productSlice.actions;
export default productSlice.reducer;
