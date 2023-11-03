import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductList } from '../services/listService';

//defining initial state
const initialState = {
  isLoading: false,
  productList: [],
  listErr: '',
};
//get the list of product from api
export const fetchProductList = createAsyncThunk('products', async () => {
  const getListData = await getProductList();
  return getListData;
});

//get the search text from search box
export const fetchSearchProduct = createAsyncThunk('search', async (searchText) => {
  return searchText;
});

export const productsSlice = createSlice({
  name: 'products',
  //initial state
  initialState,
  //for updating based on actions
  extraReducers: (builder) => {
    //for handle the api error  if the state is pending
    builder.addCase(fetchProductList.pending, (state, action) => {
      state.isLoading = true;
      state.productList = [];
      state.listErr = '';
    });
    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload;
      state.listErr = '';
    });
    //for handle the api error  if the state is pending
    builder.addCase(fetchProductList.rejected, (state, action) => {
      state.isLoading = false;
      state.productList = [];
      state.listErr = action.payload;
    });
    //fetch search data  and filter the serached product
    builder.addCase(fetchSearchProduct.fulfilled, (state, action) => {
      if (action.payload) {
        const searchProducts = state.productList.filter((data) =>
          data.title.toLowerCase().includes(action.payload.toLowerCase())
        );
        state.productList = searchProducts;
      }
    });
  },
});
