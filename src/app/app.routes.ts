// import { Routes } from '@angular/router';
// import { Home } from '../app/Pages/home/home';
// import { Shop } from '../app/Pages/shop/shop';
// import { About } from '../app/Pages/about/about';
// import { Contact } from '../app/Pages/contact/contact';
// import { Checkout } from './Pages/checkout/checkout';
// import { Login } from './components/login/login';
// import { Signup } from './components/signup/signup';

// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },

//   { path: 'login', component: Login },
//   { path: 'signup', component: Signup },

//   { path: 'home', component: Home },
//   { path: 'shop', component: Shop },
//   { path: 'about', component: About },
//   { path: 'contact', component: Contact },
//   { path: 'checkout', component: Checkout },

//   // لو دخل مسار غلط
//   { path: '**', redirectTo: 'login' },
// ];
import { Routes } from '@angular/router';
import { Home } from '../app/Pages/home/home';
import { Shop } from '../app/Pages/shop/shop';
import { About } from '../app/Pages/about/about';
import { Contact } from '../app/Pages/contact/contact';
import { Checkout } from './Pages/checkout/checkout';
import { Profile } from './Pages/profile/profile';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { NotFound } from './components/not-found/not-found';
import { Cart } from './components/cart/cart';
import { Favourite } from './components/favourite/favourite';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'home', component: Home },
  { path: 'shop', component: Shop },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'Checkout', component: Checkout },
  { path: 'profile', component: Profile },
  { path: 'cart', component: Cart },
  { path: 'favourite', component: Favourite },
  {path:'**', component: NotFound, title:'NotFound'},
];
