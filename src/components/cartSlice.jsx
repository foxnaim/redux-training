import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : { items: [], total: 0, discount: 0, currency: "USD" };
};

const saveCart = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart(),
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
        saveCart(state);
      }
    },
    applyDiscount: (state, action) => {
      switch (action.payload) {
        case "SALE10":
          state.discount = 0.1;
          break;
        case "Max40":
          state.discount = 0.2;
          break;
        case "mare":
          state.discount = 0.3;
          break;
        default:
          state.discount = 0;
      }
      saveCart(state);
    },
    
    checkout: (state) => {
      state.items = [];
      state.total = 0;
      state.discount = 0;
      saveCart(state);
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
      saveCart(state);
    },
  },
});

export const { addToCart, removeFromCart, applyDiscount, checkout, setCurrency } = cartSlice.actions;
export default cartSlice.reducer;
