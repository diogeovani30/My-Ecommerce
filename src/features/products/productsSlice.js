import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const PRODUCTS_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(PRODUCTS_URL);
  
  return response.data.map(product => ({
    id: product.id,
    title: product.title,
    price: product.price,
    quantity: product.rating.count, 
    image: product.image,
    description: product.description, 
  }));
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
