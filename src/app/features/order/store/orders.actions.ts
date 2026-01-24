import {createAction, props} from "@ngrx/store";
import {Order} from '../../../shared/models/Order.model';

// Load orders
export const loadOrders = createAction('[Orders] Load Orders');
export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: Order[] }>()
);
export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: string }>()
);

// load order by id
export const loadOrderById = createAction(
  '[Orders] Load Order By Id',
  props<{ id: number }>()
);
export const loadOrderByIdSuccess = createAction(
  '[Orders] Load Order By Id Success',
  props<{ order: Order }>()
);
export const loadOrderByIdFailure = createAction(
  '[Orders] Load Order By Id Failure',
  props<{ error: string }>()
);

// Create order
export const createOrder = createAction(
  '[Orders] Create Order',
  props<{ order: Partial<Order> }>()
);
export const createOrderSuccess = createAction(
  '[Orders] Create Order Success',
  props<{ order: Order }>()
);
export const createOrderFailure = createAction(
  '[Orders] Create Order Failure',
  props<{ error: string }>()
);


// UPDATE ORDER STATUS
export const updateOrderStatus = createAction(
  '[Orders] Update Order Status',
  props<{ id: number; status: Order['status'] }>()
);
export const updateOrderStatusSuccess = createAction(
  '[Orders] Update Order Status Success',
  props<{ order: Order }>()
);
export const updateOrderStatusFailure = createAction(
  '[Orders] Update Order Status Failure',
  props<{ error: string }>()
);
