import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private url = 'http://localhost:8080/address';

  constructor(private http: HttpClient) {
  }

  getAddresses(): Observable<any> {
    console.log(this.http.get(`${this.url}`));
    return this.http.get(`${this.url}`);
  }

  updateAddress(address: Object): Observable<Object> {
    return this.http.put(`${this.url}`, address)
  }
}
