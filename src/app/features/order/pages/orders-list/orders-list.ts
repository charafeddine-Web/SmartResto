import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {selectAllOrders, selectOrdersLoading} from '../../store/orders.selectors';
import {loadOrders} from '../../store/orders.actions';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit {
  orders$ = this.store.select(selectAllOrders);
  loading$ = this.store.select(selectOrdersLoading);

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadOrders());
  }

  openOrder(id: number): void {
    this.router.navigate(['/orders', id]);
  }

  createOrder(): void {
    this.router.navigate(['/orders/create']);
  }
}
