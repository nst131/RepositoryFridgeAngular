import { Injectable, Optional } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { AuthActivateService } from './auth-activate.service';

@Injectable({
    providedIn: 'root'
})
export class MainSiteGuardService implements CanActivateChild {
    // export class AuthGuardService implements CanActivate {

    constructor(@Optional() private authActivateService: AuthActivateService) { }

    async canActivateChild() {
        // canActivate() {
        return await this.authActivateService.isLoggedIn()
            .then((isAuth) => {
                if (isAuth) {
                    return true;
                }
                this.authActivateService.redirectOnAuth();
                return false;
            });
    }
}

@Injectable({
    providedIn: 'root'
})
export class AuthSiteGuardService implements CanActivateChild {

    constructor(@Optional() private authActivateService: AuthActivateService) { }

    async canActivateChild() {

        return await this.authActivateService.isLoggedIn()
            .then((isAuth) => {
                if (isAuth) {
                    this.authActivateService.redirectOnMainSite();
                    return false;
                }

                return true;
            });

    }
}

