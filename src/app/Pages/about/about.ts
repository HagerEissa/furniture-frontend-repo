import { Component } from '@angular/core';
import { HeroAbout } from '../../components/hero-about/hero-about';
import { AboutLayout } from './../../components/about-layout/about-layout';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeroAbout, AboutLayout],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About {}
