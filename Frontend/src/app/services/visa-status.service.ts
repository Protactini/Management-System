import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisaStatusService {
  private url = 'http://localhost:8080/visastatus';

  constructor(private http: HttpClient) {
  }

  getVisaStatuses(): Observable<any> {
    console.log(this.http.get(`${this.url}`));
    return this.http.get(`${this.url}`);
  }

  updateVisaStatuses(visaStatus: Object): Observable<Object> {
    return this.http.put(`${this.url}`, visaStatus)
  }
}
