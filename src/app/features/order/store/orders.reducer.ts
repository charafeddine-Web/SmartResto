import {createReducer, on} from '@ngrx/store';
import {InitialOrdersState} from './orders.state';
import * as OrdersActions from './orders.actions';

export const OrdersReducer = createReducer(
  InitialOrdersState,

  // Load all orders
  on(OrdersActions.loadOrders, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrdersActions.loadOrdersSuccess, (state, {orders}) => ({
    ...state,
    orders,
    loading: false
  })),
  on(OrdersActions.loadOrdersFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false
  })),

  // Load single order
  on(OrdersActions.loadOrderById, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrdersActions.loadOrderByIdSuccess, (state, {order}) => ({
    ...state,
    selectedOrder: order,
    loading: false
  })),
  on(OrdersActions.loadOrderByIdFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false
  })),

  // Create order
  on(OrdersActions.createOrder, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrdersActions.createOrderSuccess, (state, {order}) => ({
    ...state,
    orders: [order, ...state.orders],
    loading: false
  })),
  on(OrdersActions.createOrderFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false
  })),

  // Update order status
  on(OrdersActions.updateOrderStatus, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrdersActions.updateOrderStatusSuccess, (state, {order}) => ({
    ...state,
    orders: state.orders.map(o => (o.id === order.id ? order : o)),
    selectedOrder: state.selectedOrder?.id === order.id ? order : state.selectedOrder,
    loading: false
  })),
  on(OrdersActions.updateOrderStatusFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false
  }))
)
