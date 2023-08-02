import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private url = 'http://localhost:8080/person';

  constructor(private http: HttpClient) {
  }

  getInfos(): Observable<any> {
    console.log(this.http.get(`${this.url}`));
    return this.http.get(`${this.url}`);
  }

  addInfo(info: Object): Observable<Object> {
    return this.http.post(`${this.url}`, info)
  }


}
