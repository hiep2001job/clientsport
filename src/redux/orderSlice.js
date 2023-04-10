import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrdersApi, fetchOrderByIdApi } from '../api/bill';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (payload) => {
  const orders = await fetchOrdersApi(payload);
  return orders;
});

export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (orderId) => {
  const order = await fetchOrderByIdApi(orderId);
  return order;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    selectedOrder: null,
  },
  reducers: {
    selectOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.orders = [];
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = [...action.payload];
        console.log(action.payload);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.selectedOrder = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        console.error(action.error);
      });
  },
});

export const { selectOrder } = ordersSlice.actions;

export default ordersSlice.reducer;