import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  constructor(private _http:HttpClient){}
      URL_DB = "http://localhost:3000/api/favourite"

      getFavouriteForUser(id:any){
        return this._http.get(`${this.URL_DB}/${id}`)
      }

      addToFavourite(data:any){
        return this._http.post(`${this.URL_DB}/add`,data)
      }

      deleteFromFavourite(uId:any,pId:any){
        return this._http.delete(`${this.URL_DB}/${uId}/${pId}`)
      }

      clearFavourite(uId:any){
        return this._http.delete(`${this.URL_DB}/clear/${uId}`)
      }
}
