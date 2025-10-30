import { Component } from '@angular/core';
import { HeroBlog } from "../../components/hero-blog/hero-blog";

@Component({
  selector: 'app-blog',
  imports: [HeroBlog],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog {

}
