import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as OrdersActions from './orders.actions';
import {OrderService} from '../../../core/services/order-service';
import {catchError, map, of, switchMap} from 'rxjs';

export class OrdersEffects {
  constructor(
    private actions$: Actions,
    private orderService: OrderService
  ) {
  }

  loadAllOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      switchMap(() =>
        this.orderService.getAll().pipe(
          map(orders => OrdersActions.loadOrdersSuccess({orders})),
          catchError(error => of(OrdersActions.loadOrdersFailure({error: error.message})))
        )
      )
    )
  )

  loadOrderById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrderById),
      switchMap(({id}) =>
        this.orderService.getById(id).pipe(
          map(order => OrdersActions.loadOrderByIdSuccess({order})),
          catchError(err => of(OrdersActions.loadOrderByIdFailure({error: err.message})))
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      switchMap(({order}) =>
        this.orderService.create(order).pipe(
          map(created => OrdersActions.createOrderSuccess({order: created})),
          catchError(err => of(OrdersActions.createOrderFailure({error: err.message})))
        )
      )
    )
  );

  updateOrderStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.updateOrderStatus),
      switchMap(({id, status}) =>
        this.orderService.updateStatus(id, status).pipe(
          map(order => OrdersActions.updateOrderStatusSuccess({order})),
          catchError(err => of(OrdersActions.updateOrderStatusFailure({error: err.message})))
        )
      )
    )
  );
}
