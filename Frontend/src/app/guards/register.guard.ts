import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { RegisterService } from '../services/register.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(private registerService: RegisterService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|Observable<boolean> {
    const token = route.queryParams['token'];
    if (token==null) {
      return false;
    }
    return this.registerService.getToken(token).pipe(
      map(res => {
        const json = JSON.parse(res);
        if (json == null) {
          return false;
        } else {
          return true;
        }
      }), catchError(error => of(false))
    );
  }
}
