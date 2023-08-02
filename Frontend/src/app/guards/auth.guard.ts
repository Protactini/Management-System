import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|Observable<boolean> {
    const token = route.queryParams['token'];
    if (token == null) {
        this.router.navigate(['login']);
        return false;
    }
    return this.authService.gettokendata(token).pipe(
      map(res => {
        const json = JSON.parse(res);
        if (json.roleId == 3) {
            this.router.navigate(['onboard/done']);
            return false;
        } else {
            if (json.roleId == 1) {
                this.router.navigate(['hr']);
                return true;
            } else {
                this.router.navigate(['onboard'])
                return true;
            }
        }
      }), catchError(error => of(false))
    );
  }
}
