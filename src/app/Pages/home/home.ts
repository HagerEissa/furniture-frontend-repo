import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,Navbar],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  // showMenu = false;

  // toggleMenu() {
  //   this.showMenu = !this.showMenu;
  // }
}
