import { Component } from '@angular/core';
import { HeroContact } from '../../components/hero-contact/hero-contact';
import { ContactLayout } from "../../components/contact-layout/contact-layout";
import { Banner } from "../../components/banner/banner";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeroContact, ContactLayout, Banner],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact {}
