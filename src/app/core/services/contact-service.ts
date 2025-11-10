import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private _http: HttpClient) {}

  private URL_DB = 'https://insightful-stillness-production.up.railway.app/api/contact';

  sendMessage(data: any) {
    return this._http.post(this.URL_DB, data);
  }

  getMessages(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this._http.get(this.URL_DB, { headers });
  }

  deleteMessage(id: string, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this._http.delete(`${this.URL_DB}/${id}`, { headers });
  }
}
