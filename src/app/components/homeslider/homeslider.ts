import { Component, Input } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeslider',
  imports: [],
  templateUrl: './homeslider.html',
  styleUrl: './homeslider.css'
})
export class Homeslider {

   products:any = [];
  threeProducts: any[][] = [];

  @Input() limit: number | null = null;
  constructor(private _productService: ProductService, private _router: Router) { }


  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);

        this.displayThreeProducts(this.products)
      },
      error: (error) => console.log('Error ', error),
    });
  }

  goToProductDetail(product: any) {
    this._router.navigate(['/product-detail', product._id]);
  }

  displayThreeProducts(products: any[]) {
    this.threeProducts=[];
    for (let i = 0; i < products.length; i += 3) {
      this.threeProducts.push(this.products.slice(i, i + 3));
    }
    console.log("slider products ",this.threeProducts)
    return this.threeProducts;

  }


}