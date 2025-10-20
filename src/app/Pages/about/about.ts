import { Component } from '@angular/core';
import { HeroAbout } from '../../components/hero-about/hero-about';

@Component({
  selector: 'app-about',
  imports: [HeroAbout],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
