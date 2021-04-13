import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from './services/router.service';
import { map } from 'rxjs/operators';
import { LoginService } from './services/login.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
      private routerService: RouterService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        )
        : Observable<boolean> | Promise<boolean> | boolean 
        {
            return this.loginService.isUserAuthenticated()
            .pipe(map(data => {
                if (data['verified'])
                    return true;
                else
                this.routerService.routeToLogin();
            }));
        }
}

