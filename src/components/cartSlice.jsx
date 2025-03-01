import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  if (typeof window === "undefined") return { items: [], total: 0, discount: 0, currency: "USD", exchangeRates: { USD: 1, KZT: 450, EUR: 0.9 }, notifications: [] };
  
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : { items: [], total: 0, discount: 0, currency: "USD", exchangeRates: { USD: 1, KZT: 450, EUR: 0.9 }, notifications: [] };
};

const saveCart = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (error) {
    console.error("Ошибка при сохранении корзины:", error);
  }
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
      state.notifications.push({ message: `${action.payload.name} добавлен в корзину!`, type: "success" });
      saveCart(state);
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex((i) => i.id === action.payload);
      if (itemIndex !== -1) {
        state.total = Math.max(0, state.total - state.items[itemIndex].price * state.items[itemIndex].quantity);
        state.notifications.push({ message: `${state.items[itemIndex].name} удален из корзины!`, type: "error" });
        state.items.splice(itemIndex, 1);
        saveCart(state);
      }
    },
    applyDiscount: (state, action) => {
      const discounts = { SALE10: 0.1, Max40: 0.2, mare: 0.3 };
      state.discount = discounts[action.payload] || 0;
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0) * (1 - state.discount);
      saveCart(state);
    },
    checkout: (state) => {
      state.items = [];
      state.total = 0;
      state.discount = 0;
      state.notifications.push({ message: "Заказ успешно оформлен!", type: "success" });
      saveCart(state);
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
      state.total = state.total * state.exchangeRates[state.currency];
      saveCart(state);
    },
    updateExchangeRates: (state, action) => {
      state.exchangeRates = action.payload;
      saveCart(state);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addToCart, removeFromCart, applyDiscount, checkout, setCurrency, updateExchangeRates, clearNotifications } = cartSlice.actions;
export default cartSlice.reducer;
