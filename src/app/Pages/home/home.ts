import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Categories } from '../../components/categories/categories';
import { Products } from '../../components/products/products';
import { Homegrid } from '../../components/homegrid/homegrid';
import { HeroHome } from '../../components/hero-home/hero-home';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, Categories, Products, Homegrid, HeroHome],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  // showMenu = false;
  // toggleMenu() {
  //   this.showMenu = !this.showMenu;
  // }
}
