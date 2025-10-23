// import { CommonModule } from '@angular/common';
// import { Component, Input } from '@angular/core';
// import { ProductService } from '../../core/services/product-service';

// @Component({
//   selector: 'app-products',
//   imports: [CommonModule],
//   templateUrl: './products.html',
//   styleUrl: './products.css',
// })
// export class Products {

//   products: any;
//   @Input() limit: number | null = null;

//   constructor(private _productService: ProductService) {}

//   ngOnInit(): void {
//     this._productService.getAllProducts().subscribe({
//       next: (data) => {
//         this.products = data;
//         console.log(data);
//       },
//       error: (error) => console.log('Error ', error),
//     });
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductStateService } from '../../core/services/product-state.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, AsyncPipe, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products {
  @Input() limit: number | null = null;

  constructor(private state: ProductStateService) {}

  get displayedProducts$() {
    return this.state.displayedProducts$;
  }
}
