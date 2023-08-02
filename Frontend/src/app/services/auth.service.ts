import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endPoint = "http://localhost:8081";

  constructor(private http: HttpClient) { }

  gettokendata(token: string): Observable<any> {
    return this.http.get(this.endPoint + "token/" + token);
  }
}
