import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = 'http://localhost:8080/contact';

  constructor(private http: HttpClient) {
  }

  getContacts(): Observable<any> {
    console.log(this.http.get(`${this.url}`));
    return this.http.get(`${this.url}`);
  }

  updateContact(contact: Object): Observable<Object> {
    return this.http.put(`${this.url}`, contact)
  }
}
