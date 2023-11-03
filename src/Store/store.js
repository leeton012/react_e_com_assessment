import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './reducer/listReducer';
import { cartSlice } from './reducer/cartReducer';

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
});
