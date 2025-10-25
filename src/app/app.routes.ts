import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Shop } from './Pages/shop/shop';
import { Checkout } from './Pages/checkout/checkout';
import { Dashboard } from './Pages/dashboard/dashboard';
import { Profile } from './Pages/profile/profile';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { OauthSuccess } from './components/oauth-success/oauth-success';
import { Cart } from './components/cart/cart';
import { Favourite } from './components/favourite/favourite';
// import { OauthSuccessComponent } from './components/oauth-success-component/oauth-success-component';
import { NotFound } from './components/not-found/not-found';
import { Blog } from './Pages/blog/blog';
import { ProductDetail } from './components/product-detail/product-detail';
import { authGuard } from './core/guards/auth-guard';
import { adminGuardGuard } from './core/guards/admin-guard-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login},
  { path: 'signup', component: Signup },
  { path: 'oauth-success', component: OauthSuccess },
  { path: 'home', component: Home ,canActivate: [authGuard] },
  { path: 'shop', component: Shop,canActivate: [authGuard] },
  {path:'about',loadComponent:()=>import('../app/Pages/about/about').then(c=>c.About),title:'About',canActivate: [authGuard]}, //lazyload
  {path:'contact',loadComponent:()=>import('../app/Pages/contact/contact').then(c=>c.Contact),title:'contact',canActivate: [authGuard]}, //lazyload
  { path: 'Checkout', component: Checkout,canActivate: [authGuard] },
  { path: 'dashboard', component: Dashboard,canActivate: [adminGuardGuard] },
  { path: 'profile', component: Profile,canActivate: [authGuard] },
  { path: 'cart', component: Cart,canActivate: [authGuard] },
  { path: 'favourite', component: Favourite,canActivate: [authGuard] },
  // { path: 'oauthsuccesscomponent', component: OauthSuccessComponent },
  { path: 'blog', component: Blog,canActivate: [authGuard] },
  { path: 'product-detail/:id', component: ProductDetail,canActivate: [authGuard] },
  { path: '**', component: NotFound },
];
