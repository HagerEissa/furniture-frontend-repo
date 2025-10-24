import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    subject: '',
    message: '',
  };

  onSubmit() {
    if (!this.contact.name || !this.contact.email || !this.contact.message) {
      alert('Please fill all required fields.');
      return;
    }

    console.log('Form submitted:', this.contact);
    alert('Thank you! Your message has been sent.');
    this.contact = { name: '', email: '', subject: '', message: '' };
  }
}
