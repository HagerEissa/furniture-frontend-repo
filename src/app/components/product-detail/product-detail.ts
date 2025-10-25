import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {

  product: any;
  constructor(private _productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this._productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        console.log(data);
      },
      error: (error) => console.log('Error ', error),
    });
  }


}

