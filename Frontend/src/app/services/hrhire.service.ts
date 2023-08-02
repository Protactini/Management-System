import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationToken } from '../domain/RegistrationToken';
import { User } from '../domain/User';
import { ApplicationWorkFlow } from '../domain/ApplicationWorkFlow';
import { EmployeeInfo } from '../domain/EmployeeInfo';

@Injectable({
  providedIn: 'root'
})
export class HRHireService {

  allInfo!: EmployeeInfo;

  endPoint = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getToken(token: string) {
    return this.http.get(this.endPoint + 'register/' + token, {
      headers: {
        'Allow-Cross-Origin-Origin0': '*'
      },
      responseType: 'text'
    });
  }

  generateToken(email: String) {
    return this.http.post(this.endPoint + 'hr/hire/generateToken/' + email, {}, {
      headers: {
        'Allow-Cross-Origin-Origin0': '*'
      },
      responseType: 'text'
    });
  }

  getAllInfo(): Observable<any> {
    return this.http.get(this.endPoint + 'hr/allinfo');
  }

  getSingleInfo(userId: number): Observable<any> {
    return this.http.get(this.endPoint + 'hr/singleinfo/' + userId);
  }

  approveApplication(application: ApplicationWorkFlow): Observable<any> {
    return this.http.post(this.endPoint + 'hr/hire/approve', application);
  }

  rejectApplication(application: ApplicationWorkFlow): Observable<any> {
    return this.http.post(this.endPoint + 'hr/hire/reject', application);
  }
}
