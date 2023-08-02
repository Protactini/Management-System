import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SingleInfoService {
  userId!: number;
  index!: any;
  private url = `http://localhost:8080/hr/singleinfo/`;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.index = this.route.snapshot.paramMap.get("id");
    this.userId = this.index;
  }

  getAllInfo(index: any): Observable<any> {
    return this.http.get(`http://localhost:8080/hr/singleinfo/${index}`);
  }

  getAllEmployeeInfos(): Observable<any> {
    return this.http.get('http://localhost:8080/hr/allinfo');
  }

  updateEmployee(employee: Object): Observable<Object> {
    return this.http.put(`${this.url}`, employee)
  }
}
