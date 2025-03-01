import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/cartSlice"; // <-- Проверь путь

export const store = configureStore({
  reducer: {
    cart: cartReducer, // <-- Убедись, что ключ 'cart' соответствует тому, что ты используешь в useSelector
  },
});
