import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
