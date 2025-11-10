import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}
  URL_DB = 'https://insightful-stillness-production.up.railway.app/api/product';

  getAllProducts() {
    return this._http.get<any[]>(this.URL_DB);
  }

  getProductForList(params?: any) {
    return this._http.get(`${this.URL_DB}/list`, { params });
  }

  getNewProducts() {
    return this._http.get(`${this.URL_DB}/new`);
  }

  getProductById(id: any) {
    return this._http.get(`${this.URL_DB}/${id}`);
  }

  addProduct(data: any) {
    return this._http.post(this.URL_DB, data);
  }

  updateProduct(id: any, data: any) {
    return this._http.put(`${this.URL_DB}/${id}`, data);
  }

  deleteProduct(id: any) {
    return this._http.delete(`${this.URL_DB}/${id}`);
  }
}
