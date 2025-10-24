import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Shop } from './Pages/shop/shop';
import { About } from './Pages/about/about';
import { Contact } from './Pages/contact/contact';
import { Checkout } from './Pages/checkout/checkout';
import { Dashboard } from './Pages/dashboard/dashboard';
import { Profile } from './Pages/profile/profile';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { OauthSuccess } from './components/oauth-success/oauth-success';
import { Cart } from './components/cart/cart';
import { Favourite } from './components/favourite/favourite';
import { OauthSuccessComponent } from './components/oauth-success-component/oauth-success-component';
import { NotFound } from './components/not-found/not-found';
import { Blog } from './Pages/blog/blog';
import { ProductDetail } from './components/product-detail/product-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'oauth-success', component: OauthSuccess },
  { path: 'home', component: Home },
  { path: 'shop', component: Shop },
  // { path: 'about', component: About },
  {path:'about',loadComponent:()=>import('../app/Pages/about/about').then(c=>c.About),title:'About'}, //lazyload
  // { path: 'contact', component: Contact },
  {path:'contact',loadComponent:()=>import('../app/Pages/contact/contact').then(c=>c.Contact),title:'contact'}, //lazyload
  { path: 'Checkout', component: Checkout },
  { path: 'dashboard', component: Dashboard },
  { path: 'profile', component: Profile },
  { path: 'cart', component: Cart },
  { path: 'favourite', component: Favourite },
  { path: 'oauthsuccesscomponent', component: OauthSuccessComponent },
  { path: 'blog', component: Blog },
  { path: 'product-detail/:id', component: ProductDetail },

  { path: '**', component: NotFound },
];
