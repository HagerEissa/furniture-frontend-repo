import { Routes } from '@angular/router';
import { Home } from '../app/Pages/home/home';

import { Shop } from '../app/Pages/shop/shop';
import { About } from '../app/Pages/about/about';
import { Contact } from '../app/Pages/contact/contact';
import { Checkout } from './Pages/checkout/checkout';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'shop', component: Shop },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
    { path: 'Checkout', component: Checkout },

];
