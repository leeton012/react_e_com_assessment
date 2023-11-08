import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  cartList: [],
};

export const addToCart = createAsyncThunk('add/cart', async (product) => {
  return {
    ...product,
    qty: 1,
  };
});

export const removeFromCart = createAsyncThunk('remove/cart', async (productId) => {
  return productId;
});

export const clearCart = createAsyncThunk('clear/cart', async () => {
  return [];
});

export const updateCart = createAsyncThunk('update/cart', async (updateItem) => {
  console.log('coming here');
  return updateItem;
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builders) => {
    //if cart fullfilled then add the item
    builders.addCase(addToCart.fulfilled, (state, action) => {
      state.cartList = state.cartList.concat(action.payload);
    });
    //if remove cart is fullfilled then remove using id
    builders.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cartList = state.cartList.filter((item) => item.id !== action.payload);
    });
    // clear the cart
    builders.addCase(clearCart.fulfilled, (state, action) => {
      state.cartList = action.payload;
    });
    // if update cart then update the cart and add the questity
    builders.addCase(updateCart.fulfilled, (state, action) => {
      const newCartList = state.cartList;
      const newCartListIndex = state.cartList.findIndex((item) => item.id === action.payload.id);
      //if payload type is add then add item qty to cart list
      if (action.payload.type === 'add') {
        newCartList[newCartListIndex].qty = newCartList[newCartListIndex].qty + 1;
      }
      //if payload type is remove then remove item qty from cart list
      if (action.payload.type === 'minus') {
        newCartList[newCartListIndex].qty = newCartList[newCartListIndex].qty - 1;
      }
      state.cartList = newCartList;
    });
  },
});
