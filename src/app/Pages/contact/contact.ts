import { Component, OnInit } from '@angular/core';
import { HeroContact } from '../../components/hero-contact/hero-contact';
import { ContactLayout } from "../../components/contact-layout/contact-layout";
import { Banner } from "../../components/banner/banner";
import { Auth } from '../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeroContact, ContactLayout, Banner, CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact implements OnInit {
  isAdminUser = false;

  constructor(private _authService: Auth) {}

  ngOnInit(): void {
    this.isAdminUser = this._authService.isAdmin();
  }
}
