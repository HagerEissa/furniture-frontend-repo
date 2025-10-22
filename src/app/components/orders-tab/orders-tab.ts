import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-tab',
  imports: [CommonModule],
  templateUrl: './orders-tab.html',
  styleUrl: './orders-tab.css',
})
export class OrdersTab {
  orders = [
    { id: 'ORD001', customer: 'Tony Stark', total: 450, status: 'Completed' },
    { id: 'ORD002', customer: 'Steve Rogers', total: 200, status: 'Pending' },
    { id: 'ORD003', customer: 'Natasha Romanoff', total: 300, status: 'Cancelled' },
  ];

  changeStatus(order: any) {
    const statuses = ['Pending', 'Completed', 'Cancelled'];
    const currentIndex = statuses.indexOf(order.status);
    order.status = statuses[(currentIndex + 1) % statuses.length];
  }
}
