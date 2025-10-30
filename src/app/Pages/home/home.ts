import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Categories } from '../../components/categories/categories';
import { Homegrid } from '../../components/homegrid/homegrid';
import { HeroHome } from '../../components/hero-home/hero-home';
import { CommonModule } from '@angular/common';
import { Products } from '../../components/products/products';
import { ProductStateService } from '../../core/services/product-state.service';
import { Homeslider } from "../../components/homeslider/homeslider";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, Categories, Homegrid, HeroHome, CommonModule, Products, Homeslider],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  constructor(private productState: ProductStateService) {}

  ngOnInit() {
    this.productState.resetFilters(); 
  }
}
