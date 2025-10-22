import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../core/services/auth'; 

@Component({
  selector: 'app-oauth-success',
  standalone: true,
  templateUrl: './oauth-success.html',
  styleUrls: ['./oauth-success.css'],
})
export class OauthSuccess implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private auth: Auth) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.auth.setToken(token); // 
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
