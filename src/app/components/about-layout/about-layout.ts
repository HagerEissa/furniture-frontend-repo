import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-layout.html',
  styleUrls: ['./about-layout.css'],
})
export class AboutLayout {
  teamMembers = [
    {
      name: 'Hager Salah',
      role: 'Fullstack Developer',
      linkedin: 'https://www.linkedin.com/in/hager-salah-31ba77336/',
      github: 'https://github.com/HagerEissa',
    },
    {
      name: 'Roaa Mounir',
      role: 'Fullstack Developer',
      linkedin: 'https://www.linkedin.com/in/roaamounir96',
      github: 'https://github.com/roaamounir',
    },
    {
      name: 'Salma Fadl',
      role: 'Fullstack Developer',
      linkedin: 'https://www.linkedin.com/in/salma-azzam-0bb68b19b',
      github: 'https://github.com/salmafadlabdulrahman',
    },
    {
      name: 'Shahd Samy',
      role: 'Fullstack Developer',
      linkedin: 'https://www.linkedin.com/in/shahd-samy-5a44b1318?utm',
      github: 'https://github.com/shahd-samy',
    },
    {
      name: 'Sandy Azzat',
      role: 'Fullstack Developer',
      linkedin: 'https://www.linkedin.com/in/sandy-azzat',
      github: 'https://github.com/SandyAzzat',
    },
  ];
}
