import { Component } from '@angular/core';
import { HeroProfile } from "../../components/hero-profile/hero-profile";
import { ProfileLayout } from "../../components/profile-layout/profile-layout";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeroProfile, ProfileLayout],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile {

}
