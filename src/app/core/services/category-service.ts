import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  _id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  URL_DB = 'https://furniture-backend-repo-production.up.railway.app/api/category';

  getAllCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(this.URL_DB);
  }

  getCategoryById(id: any): Observable<Category> {
    return this._http.get<Category>(`${this.URL_DB}/${id}`);
  }

  addCategory(data: any) {
    return this._http.post(this.URL_DB, data);
  }

  updateCategory(id: any, data: any) {
    return this._http.put(`${this.URL_DB}/${id}`, data);
  }

  deleteCategory(id: any) {
    return this._http.delete(`${this.URL_DB}/${id}`);
  }
}
