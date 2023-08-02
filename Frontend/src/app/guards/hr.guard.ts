import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { TokenData } from '../domain/TokenData';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class HRGuard implements CanActivate {

    tokenData!: TokenData;
    
    constructor(private loginService: LoginService, private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|Observable<boolean> {

        return this.loginService.getTokenData().pipe(
            map(token => {
                this.tokenData = JSON.parse(token);
                if (this.tokenData.roleId == 1) {
                    return true;
                } else {
                    this.router.navigate(["employee"]);
                    return false;
                }
            }), catchError(error => of(false))
        );
    }
}
