import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../core/services/contact-service';

@Component({
  selector: 'app-contact-layout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-layout.html',
  styleUrls: ['./contact-layout.css'],
})
export class ContactLayout {
  contact = {
    name: '',
    email: '',
    message: '',
  };

  constructor(private _contactService: ContactService) {}

  onSubmit() {
    if (!this.contact.name || !this.contact.email || !this.contact.message) {
      alert('Please fill all required fields.');
      return;
    }

    this._contactService.sendMessage(this.contact).subscribe({
      next: () => {
        alert('Thank you! Your message has been sent.');
        this.contact = { name: '', email: '', message: '' };
      },
      error: (err) => {
        console.error('Error sending message:', err);
        alert('Something went wrong. Please try again later.');
      },
    });
  }
}
