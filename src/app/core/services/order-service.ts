import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  URL_DB = 'http://localhost:3000/api/orders';

  constructor(private _http: HttpClient) {}
      createOrder(data:any){
        return this._http.post(this.URL_DB,data)
      }

      getUserOrders(id:any){
        return this._http.get(`${this.URL_DB}/user/${id}`)
      }

      getOrderById(id:any){
        return this._http.get(`${this.URL_DB}/${id}`)
      }

      updateOrderStatus(id: any, status: string) {
        return this._http.patch(`${this.URL_DB}/${id}/status`, { status });
      }

}
