import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderState } from '../utils/types';

const initialState: OrderState = {
    order: null,
    status: 'idle',
    error: null,
  };
  
  const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      setOrder: (state, action: PayloadAction<Order>) => {
        state.order = action.payload;
        state.status = 'succeeded';
      },
      clearOrder: (state) => {
        state.order = null;
        state.status = 'idle';
        state.error = null;
      },
    },
  });
  
  export const { setOrder, clearOrder } = orderSlice.actions;
  export default orderSlice.reducer;