import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _http:HttpClient){}
      URL_DB = "https://insightful-stillness-production.up.railway.app/api/user"

      getUsers(){
        return this._http.get(this.URL_DB);
      }

      updateProfile(data:any){
        return this._http.put(`${this.URL_DB}/profile`,data)
      }

      updateRole(id:any,data:any){
        return this._http.put(`${this.URL_DB}/${id}/role`,data)
      }

      deleteUser(id:any){
        return this._http.delete(`${this.URL_DB}/${id}`)
      }
}
