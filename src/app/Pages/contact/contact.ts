import { Component } from '@angular/core';
import { HeroContact } from '../../components/hero-contact/hero-contact';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeroContact],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact {}
