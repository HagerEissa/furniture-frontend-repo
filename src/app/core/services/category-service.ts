import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private _http:HttpClient){}
      URL_DB = "http://localhost:3000/api/category"

      getAllCategories(){
        return this._http.get(this.URL_DB)
      }

      getCategoryById(id:any){
        return this._http.get(`${this.URL_DB}/${id}`)
      }

      addCategory(data:any){
        return this._http.post(this.URL_DB,data)
      }

      updateCategory(id:any,data:any){
        return this._http.put(`${this.URL_DB}/${id}`,data)
      }

      deleteCategory(id:any){
        return this._http.delete(`${this.URL_DB}/${id}`)
      }
}
