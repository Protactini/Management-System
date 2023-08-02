import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenData } from '../domain/TokenData';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class OnBoardGuard implements CanActivate {
  tokenData!: TokenData;
    
    constructor(private loginService: LoginService, private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|Observable<boolean> {

        return this.loginService.getTokenData().pipe(
            map(token => {
                this.tokenData = JSON.parse(token);
                if (this.tokenData.roleId == 2 || this.tokenData.roleId == 1) {
                    return true;
                } if (this.tokenData.roleId == 4) {
                    this.router.navigate(["onboard/done"]);
                    return false;
                } else {
                    this.router.navigate(["onboard"]);
                    return false;
                }
            }) /*catchError(error => of(false))*/
        );
    }
  
}
