import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private _http:HttpClient){}
      URL_DB = "http://localhost:3000/api/product"

      getReviewsByProductId(id:any){
        return this._http.get(`${this.URL_DB}/${id}/review`)
      }

      createReviewandRating(id:any,data:any){
        return this._http.post(`${this.URL_DB}/${id}/review`,data)
      }


      updateReviewById(id:any,data:any){
        return this._http.put(`${this.URL_DB}/${id}/review`,data)
      }

      deleteReviewById(id:any){
        return this._http.delete(`${this.URL_DB}/${id}/review`)
      }
}
