import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order-service'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-orders-tab',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './orders-tab.html',
  styleUrls: ['./orders-tab.css'],
})
export class OrdersTab implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getUserOrders().subscribe({
      next: (res: any) => {
        this.orders = res;
        console.log('Orders loaded:', res);
      },
      error: (err) => {
        console.error('Error loading orders:', err);
      },
    });
  }

  changeStatus(order: any) {
    const nextStatus =
      order.status === 'pending'
        ? 'processing'
        : order.status === 'processing'
        ? 'shipped'
        : 'delivered';

    this.orderService.updateOrderStatus(order._id, nextStatus).subscribe({
      next: (res: any) => {
        console.log('Status updated:', res);
        this.loadOrders(); 
      },
      error: (err) => {
        console.error('Error updating status:', err);
      },
    });
  }

  deleteOrder(id: string) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe({
        next: () => {
          this.orders = this.orders.filter((o) => o._id !== id);
        },
        error: (err) => console.error('Error deleting order:', err),
      });
    }
  }
}
