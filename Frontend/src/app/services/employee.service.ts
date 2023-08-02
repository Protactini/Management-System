import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<any> {
    console.log(this.http.get(`${this.url}`));
    return this.http.get(`${this.url}`);
  }

  updateEmployee(employee: Object): Observable<Object> {
    return this.http.put(`${this.url}`, employee)
  }
}
