import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product-service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products: any;

  constructor(private _productService:ProductService){}

  
  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
       next: (data)=> {
        this.products = data
        console.log(data);
       },
       error: (error) => console.log("Error ", error)
    })
    // this.products = [
    //   {
    //     title: 'Coffee Table',
    //     desc: 'Glass simple coffee table with wooden base',
    //     price: 200.75,
    //     image:
    //       'https://images.unsplash.com/photo-1647967527216-adea2f078e07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwdGFibGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    //     isNew: true,
    //     discount: null,
    //   },
    //   {
    //     title: 'Gray Sofa',
    //     desc: 'Modern gray sofa perfect for living room',
    //     price: 350.0,
    //     image:
    //       'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNvZmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    //     isNew: false,
    //     discount: 50,
    //   },
    //   {
    //     title: 'Bedside Lamp',
    //     desc: 'Stylish lamp with warm light',
    //     price: 75.99,
    //     image:
    //       'https://images.unsplash.com/photo-1600421684846-e7ebc943403b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxhbXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    //     isNew: false,
    //     discount: null,
    //   },
    // ];
  }
}
