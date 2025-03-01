import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : { items: [], total: 0 };
};

const saveCart = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const initialState = loadCart();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
      saveCart(state);
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex((i) => i.id === action.payload);
      if (itemIndex !== -1) {
        state.total -= state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
      saveCart(state);
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total += item.price;
        saveCart(state);
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.total -= item.price;
        saveCart(state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveCart(state);
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
