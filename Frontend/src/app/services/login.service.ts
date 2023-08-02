import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endPoint = "http://localhost:8081/";

  constructor(private http: HttpClient) { }

  login(obj: Object): Observable<any> {
    return this.http.post(this.endPoint + 'login/', obj, {responseType:"text", withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.get(this.endPoint + 'logout/', {responseType:"text", withCredentials: true });
  }

  getTokenData(): Observable<any> {
    return this.http.get(this.endPoint + 'gettokendata', {responseType:"text", withCredentials: true });
  }

  // getToken(token: string) {
  //   return this.http.get(this.endPoint + 'login/' + token, {
  //     headers: {
  //       'Allow-Cross-Origin-Origin0': '*'
  //     },
  //     responseType: 'text'
  //   });
  // }
  // loginHR(obj: Object) {
  //   return this.http.post(this.endPoint + 'login/hr', obj, {
  //     headers: {
  //       'Allow-Cross-Origin-Origin0': '*'
  //     },
  //     responseType: 'text'
  //   });
  // }

  // loginEmployee(obj: Object) {
  //   return this.http.post(this.endPoint + 'login/employee', obj, {
  //     headers: {
  //       'Allow-Cross-Origin-Origin0': '*'
  //     },
  //     responseType: 'text'
  //   });
  // }
}
