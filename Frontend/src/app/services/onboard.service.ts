import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationToken } from '../domain/RegistrationToken';
import { Person } from '../domain/Person';
import { Employee } from '../domain/Employee';
import { Contact } from '../domain/Contact';

@Injectable({
  providedIn: 'root'
})
export class OnboardService {

  endPoint = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  uploadSection1(obj: Object) {
    return this.http.post(this.endPoint + 'onboard/section1', obj, {
      headers: {
        'Allow-Cross-Origin-Origin0': '*'
      },
      responseType: 'text'
    });
  }

  uploadSection2(obj: Object) {
    return this.http.post(this.endPoint + 'onboard/section2', obj, {
      headers: {
        'Allow-Cross-Origin-Origin0': '*'
      },
      responseType: 'text'
    });
  }

  uploadSection3(contactList: Contact[]) {
    return this.http.post(this.endPoint + 'onboard/section3', contactList, {
      headers: {
        'Allow-Cross-Origin-Origin0': '*'
      },
      responseType: 'text'
    });
  }
}
