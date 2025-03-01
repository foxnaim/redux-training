import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  items: [],
  total: 0,
  discount: 0,
  currency: "USD",
  exchangeRates: { USD: 1, KZT: 450, EUR: 0.9 },
  notifications: [],
};

const loadCart = () => {
  if (typeof window === "undefined") return { ...defaultState };

  try {
    const cart = localStorage.getItem("cart");
    return cart ? { ...defaultState, ...JSON.parse(cart), items: JSON.parse(cart).items || [] } : { ...defaultState };
  } catch (error) {
    console.error("Ошибка при загрузке корзины:", error);
    return { ...defaultState };
  }
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
      if (!state.items) state.items = []; // Гарантируем, что items существует

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
      if (!state.items) state.items = []; // Гарантируем, что items существует

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
      if (!state.exchangeRates) state.exchangeRates = defaultState.exchangeRates; // Гарантируем наличие exchangeRates
      if (!state.items) state.items = [];

      state.currency = action.payload;
      state.total = state.total * (state.exchangeRates[state.currency] || 1);
      saveCart(state);
    },

    updateExchangeRates: (state, action) => {
      state.exchangeRates = action.payload || defaultState.exchangeRates;
      saveCart(state);
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  applyDiscount,
  checkout,
  setCurrency,
  updateExchangeRates,
  clearNotifications,
} = cartSlice.actions;
export default cartSlice.reducer;
