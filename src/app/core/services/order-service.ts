import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  URL_DB = 'https://furniture-backend-repo-production.up.railway.app/api/orders'; 

  constructor(private _http: HttpClient) {}

  createOrder(data: any) {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this._http.post(this.URL_DB, data, { headers });
  }

  getUserOrders() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this._http.get(`${this.URL_DB}/user`, { headers });
  }

  getOrderById(id: any) {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this._http.get(`${this.URL_DB}/${id}`, { headers });
  }

  updateOrderStatus(id: any, status: string) {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this._http.patch(`${this.URL_DB}/${id}/status`, { status }, { headers });
  }
  deleteOrder(id: string) {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  return this._http.delete(`${this.URL_DB}/${id}`, { headers });
}
getAllOrders() {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  return this._http.get(this.URL_DB, { headers });
}

}
