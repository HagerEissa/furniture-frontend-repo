import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Categories } from '../../components/categories/categories';
import { Homegrid } from '../../components/homegrid/homegrid';
import { HeroHome } from '../../components/hero-home/hero-home';
import { CommonModule } from '@angular/common';
import { Products } from "../../components/products/products";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, Categories, Homegrid, HeroHome, CommonModule, Products],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
}
