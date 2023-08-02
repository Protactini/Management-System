import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private url = 'http://localhost:8080/person';

  constructor(private http: HttpClient) {
  }

  getPersons(): Observable<any> {
   // return this.http.get(`${this.url}`);
    return this.http.get(`http://localhost:8080/person`);
    console.log("GET Person data----------------!");
  }

  updatePerson(person: Object): Observable<Object> {
    return this.http.put(`${this.url}`, person)
  }
}
