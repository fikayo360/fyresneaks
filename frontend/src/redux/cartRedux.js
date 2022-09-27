import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    count:0
  },
  reducers: {
    addProduct: (state, action) => {
      state.count += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    clearAll:(state) => {
      state.products = []
      state.quantity = 0
      state.total = 0
      state.count = 0
    }
  },
});

export const { addProduct,clearAll } = cartSlice.actions;
export default cartSlice.reducer;
