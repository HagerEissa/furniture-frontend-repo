import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { UserService } from '../../core/services/user-service';

@Component({
  selector: 'app-users-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-tab.html',
  styleUrls: ['./users-tab.css'],
})
export class UsersTab {
  users = signal<any[]>([]);

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res: any) => this.users.set(res),
      error: (err) => console.error('Failed to load users:', err),
    });
  }

  toggleRole(user: any) {
    const newRole = user.role.toLowerCase() === 'admin' ? 'user' : 'admin';

    this.userService.updateRole(user._id, { role: newRole }).subscribe({
      next: () => {
        // Update the local users signal so UI updates immediately
        const updatedUsers = this.users().map((u) =>
          u._id === user._id ? { ...u, role: newRole } : u
        );
        this.users.set(updatedUsers);
      },
      error: (err) => console.error('Failed to update role:', err),
    });
  }

  deleteUser(user: any) {
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) return;
    this.userService.deleteUser(user._id).subscribe({
      next: () => {
        const updatedUsers = this.users().filter((u) => u._id !== user._id);
        this.users.set(updatedUsers);
      },
      error: (err) => console.error('Failed to delete user:', err),
    });
  }
}
