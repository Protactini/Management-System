import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationToken } from '../domain/RegistrationToken';
import { User } from '../domain/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  endPoint = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getError(): Observable<any> {
    return this.http.get(this.endPoint + 'error', {
      headers: {
        'Allow-Cross-Origin-Origin0': '*'
      },
      responseType: 'text'
    });
  }

  getToken(token: string) {
    return this.http.get(this.endPoint + 'register/' + token, {
      headers: {
        'Allow-Cross-Origin-Origin0': '*'
      },
      responseType: 'text'
    });
  }

  uploadUser(user: User) {
    return this.http.post(this.endPoint + 'register', user, {
      headers: {
        'Allow-Cross-Origin-Origin0': '*'
      },
      responseType: 'text'
    });
  }
}
