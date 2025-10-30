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
import { NotFound } from './components/not-found/not-found';
import { ProductDetail } from './components/product-detail/product-detail';
import { PaymentSuccessComponent } from './components/suceesspayment/suceesspayment';
import { authGuard } from './core/guards/auth-guard';
import { adminGuardGuard } from './core/guards/admin-guard-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'oauth-success', component: OauthSuccess },
  { path: 'home', component: Home, title: 'Home', canActivate: [authGuard] },
  { path: 'shop', component: Shop, title: 'Shop', canActivate: [authGuard] },
  {
    path: 'about',
    loadComponent: () => import('../app/Pages/about/about').then((c) => c.About),
    title: 'About',
    canActivate: [authGuard],
  },
  {
    path: 'contact',
    loadComponent: () => import('../app/Pages/contact/contact').then((c) => c.Contact),
    title: 'contact',
    canActivate: [authGuard],
  },
  { path: 'Checkout', component: Checkout, title: 'Checkout', canActivate: [authGuard] },
  { path: 'dashboard', component: Dashboard, title: 'dashboard', canActivate: [adminGuardGuard] },
  { path: 'profile', component: Profile, title: 'profile', canActivate: [authGuard] },
  { path: 'cart', component: Cart, title: 'Cart', canActivate: [authGuard] },
  { path: 'favourite', component: Favourite, title: 'Favourite', canActivate: [authGuard] },
  {
    path: 'blog',
    loadComponent: () => import('./Pages/blog/blog').then((c) => c.Blog),
    title: 'blog',
    canActivate: [authGuard],
  },
  {
    path: 'product-detail/:id',
    component: ProductDetail,
    title: 'ProductDetail',
    canActivate: [authGuard],
  },
  {
    path: 'payment-success',
    component: PaymentSuccessComponent,
    title: 'Payment Success',
    canActivate: [authGuard],
  },
  { path: '**', component: NotFound, title: 'NotFound' },
];
