import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  endPoint = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  getNameData(): Observable<any> {
    return this.http.get(this.endPoint + 'name', {
      headers: {
        'Allow-Cross-Origin-Origin': '*',
      },
      responseType: 'text',
    });
  }

  postNameData(data: any): Observable<any> {
    return this.http.post(this.endPoint + 'name', data);
  }

  postFileData(data: any): Observable<any> {
    return this.http.post(this.endPoint + 'file', data);
  }

  postAvartar(data: any): Observable<any> {
    return this.http.post(this.endPoint + 'avartar', data);
  }

  // EmployeeData(data: any): Observable<any> {
  //   return this.http.post(this.endPoint + 'file', data);
  // }

  getEmployeeVisaData(id: number): Observable<any> {
    return this.http.get(this.endPoint + 'employeeVisa/' + id, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      responseType: 'text',
    });
  }

  postEmployeeVisaData(data: any): Observable<any> {
    return this.http.post(this.endPoint + 'employeeVisa/', data);
  }

  getAllEmplyeeVisaData(): Observable<any> {
    return this.http.get(this.endPoint + 'allEmployeeVisa', {
      headers: {
        'Allow-Cross-Origin-Origin': '*',
      },
      responseType: 'text',
    });
  }
}
