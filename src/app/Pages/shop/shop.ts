import { Component } from '@angular/core';
import { Banner } from '../../components/banner/banner';
import { HeroShop } from '../../components/hero-shop/hero-shop';
import { ControlBar } from '../../components/control-bar/control-bar';
import { Products } from '../../components/products/products';
import { OnInit } from '@angular/core';
import { ProductStateService } from '../../core/services/product-state.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [Banner, HeroShop, ControlBar, Products],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit {
  constructor(private route: ActivatedRoute, private state: ProductStateService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const categoryId = params['category'] || 'all';
      this.state.setFilter(categoryId);
    });
  }
}
