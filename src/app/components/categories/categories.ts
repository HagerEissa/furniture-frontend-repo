import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categories = [
    {
      title: 'Dining',
      image:
        'https://images.unsplash.com/photo-1617098709804-705581f844eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGluaW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
      alt: 'an image of a dining table',
    },
    {
      title: 'Living',
      image:
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGl2aW5nJTIwcm9vbSUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
      alt: 'an image of a living room',
    },
    {
      title: 'Bedroom',
      image:
        'https://images.unsplash.com/photo-1737233019359-625e96ec8694?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVkcm9vbSUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
      alt: 'an image of a bedroom',
    },
  ];
}
