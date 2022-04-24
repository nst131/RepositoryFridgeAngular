import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthActivateService } from "src/app/Auth/services/auth-activate.service";
import { Roles } from "src/app/models/roles.enum";

@Injectable({
      providedIn: 'root'
})
export class RoutesService {

      constructor(private router: Router, private authActivateService: AuthActivateService) { }

      public async redirectOnPageAccount() {
            switch (AuthActivateService.getSession()?.role) {
                  case Roles.Administrator:
                        await this.redirectOnPage(['/main-site', { outlets: { 'main-site': ['account-admin'] } }]);
                        break;
                  case Roles.User:
                        await this.redirectOnPage(['/main-site', { outlets: { 'main-site': ['account-user'] } }]);
                        break;
                  default:
                        await this.redirectOnPage(['/main-site', { outlets: { 'main-site': ['exception'] } }]);
            }
      }

      private async redirectOnPage(path: any[]) {
            if (!await this.router.navigate(path)) {
                  if (this.authActivateService.SessionIsValid()) {
                        window.location.reload();
                  }
            }
      }
}