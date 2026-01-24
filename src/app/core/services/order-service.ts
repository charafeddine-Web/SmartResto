import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {Order} from '../../shared/models/Order.model';

const STORAGE_KEY = 'orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private getOrdersFromStorage(): Order[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const orders: Order[] = JSON.parse(raw);

    // Restore Date object (important)
    return orders.map(order => ({
      ...order,
      createdAt: new Date(order.createdAt)
    }));
  }

  private saveOrdersToStorage(orders: Order[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }

  private generateId(): number {
    return Date.now();
  }

  /* ===============================
     Public API (NgRx Effects use these)
  =============================== */

  // GET ALL ORDERS
  getAll(): Observable<Order[]> {
    const orders = this.getOrdersFromStorage();
    return of(orders);
  }

  // GET ORDER BY ID
  getById(id: number): Observable<Order> {
    const orders = this.getOrdersFromStorage();
    const order = orders.find(o => o.id === id);

    if (!order) {
      return throwError(() => new Error('Order not found'));
    }

    return of(order);
  }

  // CREATE ORDER
  create(order: Partial<Order>): Observable<Order> {
    const orders = this.getOrdersFromStorage();

    const newOrder: Order = {
      id: this.generateId(),
      items: order.items ?? [],
      totalPrice: order.totalPrice ?? 0,
      status: order.status ?? 'PENDING',
      createdAt: new Date()
    };

    const updatedOrders = [newOrder, ...orders];
    this.saveOrdersToStorage(updatedOrders);

    return of(newOrder);
  }

  // UPDATE ORDER STATUS
  updateStatus(
    id: number,
    status: Order['status']
  ): Observable<Order> {
    const orders = this.getOrdersFromStorage();
    const index = orders.findIndex(o => o.id === id);

    if (index === -1) {
      return throwError(() => new Error('Order not found'));
    }

    const updatedOrder: Order = {
      ...orders[index],
      status
    };

    orders[index] = updatedOrder;
    this.saveOrdersToStorage(orders);

    return of(updatedOrder);
  }

  // OPTIONAL: DELETE ORDER (future-proof)
  delete(id: number): Observable<number> {
    const orders = this.getOrdersFromStorage();
    const exists = orders.some(o => o.id === id);

    if (!exists) {
      return throwError(() => new Error('Order not found'));
    }

    const updatedOrders = orders.filter(o => o.id !== id);
    this.saveOrdersToStorage(updatedOrders);

    return of(id);
  }

  // OPTIONAL: CLEAR ALL (dev only)
  clear(): Observable<void> {
    localStorage.removeItem(STORAGE_KEY);
    return of(void 0);
  }
}
