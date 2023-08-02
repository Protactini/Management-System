import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RegistrationToken } from '../domain/RegistrationToken';
import { RegisterService } from '../services/register.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterResolver implements Resolve<string> {

  constructor(private registerService: RegisterService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    const token = route.queryParams['token'];
    return this.registerService.getToken(token);
  }
}
