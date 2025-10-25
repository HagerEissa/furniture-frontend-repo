import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact-service';

@Component({
  selector: 'app-messages-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages-tab.html',
  styleUrls: ['./messages-tab.css'],
})
export class MessagesTab {
  messages: any[] = [];
  loading = true;
  error = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.error = '';

    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'No admin token found.';
      this.loading = false;
      return;
    }

    this.contactService.getMessages(token).subscribe({
      next: (data: any) => {
        this.messages = data?.messages || data?.message || data || [];
      },
      error: () => {
        this.error = 'Failed to load messages.';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  deleteMessage(id: string): void {
    if (!confirm('Are you sure you want to delete this message?')) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No admin token found.');
      return;
    }

    this.contactService.deleteMessage(id, token).subscribe({
      next: () => {
        this.messages = this.messages.filter((m) => m._id !== id);
        alert('Message deleted successfully.');
      },
      error: () => {
        alert('Failed to delete message.');
      },
    });
  }
}
