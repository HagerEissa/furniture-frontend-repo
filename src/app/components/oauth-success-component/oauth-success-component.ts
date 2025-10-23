import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-oauth-success-component',
  imports: [],
  templateUrl: './oauth-success-component.html',
  styleUrl: './oauth-success-component.css'
})
export class OauthSuccessComponent implements OnInit{
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');

    if (token) {
      this.authService.setToken(token);
      alert('Login successful!');
      this.router.navigate(['/home']);
    } else {
      alert('OAuth login failed');
      this.router.navigate(['/login']);
    }
  }
}
