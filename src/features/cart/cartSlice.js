// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array dari { productId, title, price, quantity, image }
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find(item => item.productId === product.id);
      state.totalQuantity += 1;
      state.totalAmount += product.price;

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          image: product.image,
        });
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => item.productId !== productId);
      }
    },
    incrementQuantity(state, action) {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount += existingItem.price;
      }
    },
    decrementQuantity(state, action) {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= existingItem.price;
      } else if (existingItem) {
        
        state.totalQuantity -= 1;
        state.totalAmount -= existingItem.price;
        state.items = state.items.filter(item => item.productId !== productId);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
