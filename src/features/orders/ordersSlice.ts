import { Order } from '../../types/types.Order';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { deleteOrder, fetchOrders } from './ordersThunk';

interface OrdersState {
  items: Order[];
  fetchLoading: boolean;
  fetchError: boolean;
  deliveryLoading: boolean;
  cancelLoading: boolean;
  openModal: boolean;
}

const initialState: OrdersState = {
  items: [],
  fetchLoading: false,
  fetchError: false,
  deliveryLoading: false,
  cancelLoading: false,
  openModal: false,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    toggleModal: (state, { payload: action }) => {
      state.openModal = action;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload.shipments;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.fetchLoading = false;
        state.fetchError = true;
      });
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.fetchLoading = false;
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.fetchLoading = false;
        state.fetchError = true;
      });
  },
});

export const ordersReducer = ordersSlice.reducer;
export const { toggleModal } = ordersSlice.actions;
export const selectOrders = (state: RootState) => state.orders.items;
export const selectOrdersLoading = (state: RootState) =>
  state.orders.fetchLoading;
export const selectOrdersDeliveryLoading = (state: RootState) =>
  state.orders.deliveryLoading;
export const selectOrdersCancelLoading = (state: RootState) =>
  state.orders.cancelLoading;
export const selectOrderModal = (state: RootState) => state.orders.openModal;
