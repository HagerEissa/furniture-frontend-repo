import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-users-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-tab.html',
  styleUrl: './users-tab.css',
})
export class UsersTab {
  users = [
    { name: 'Tony Stark', email: 'tony@example.com', role: 'User' },
    { name: 'Steve Rogers', email: 'steve@example.com', role: 'Admin' },
    { name: 'Natasha Romanoff', email: 'nat@example.com', role: 'User' },
    { name: 'Bucky', email: 'buck@example.com', role: 'User' },
    { name: 'Sam wilson', email: 'sam@example.com', role: 'User' },
    { name: 'Vision', email: 'vision@example.com', role: 'User' },
    { name: 'Wanda Maximoff', email: 'wanda@example.com', role: 'User' },
  ];
  userColumns = ['name', 'email', 'role'];

  toggleRole(user: any) {
    user.role = user.role === 'Admin' ? 'User' : 'Admin';
  }
}