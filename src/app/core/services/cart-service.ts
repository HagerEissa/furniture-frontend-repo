import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _http: HttpClient) {}
  URL_DB = 'https://furniture-backend-repo-production.up.railway.app/api/cart';

  getCartForUser(id: any) {
    return this._http.get(`${this.URL_DB}/${id}`);
  }

  addToCart(data: any) {
    return this._http.post(`${this.URL_DB}/add`, data);
  }

  deleteProductFromCart(uId: any, pId: any) {
    return this._http.delete(`${this.URL_DB}/${uId}/${pId}`);
  }

  updateQuantity(uId: any, pId: any, quantity: number) {
    return this._http.put(`${this.URL_DB}/${uId}/${pId}`, { quantity });
  }

  clearCart(uId: any) {
    return this._http.delete(`${this.URL_DB}/clear/${uId}`);
  }
}
