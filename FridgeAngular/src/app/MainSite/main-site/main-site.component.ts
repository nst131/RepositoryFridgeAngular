import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthActivateService } from 'src/app/Auth/services/auth-activate.service';
import { RoutesService } from '../services/routes.service';

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css'],
})
export class MainSiteComponent {

  constructor(
    private router: Router,
    private authActivateService: AuthActivateService,
    private routesService: RoutesService) { }

  public logout(): void {
    this.authActivateService.logoutService();
    this.authActivateService.redirectOnAuth();
  }

  public async redirectOnPageAccount() { // Not Use
    this.routesService.redirectOnPageAccount();
  }

  public async redirectOnProcedure(){
    await this.redirectOnPage(['/main-site', { outlets: { 'main-site': ['fridge', 'procedure'] } }])
  }

  public async redirectOnPageFridges(){
    await this.redirectOnPage(['/main-site', { outlets: { 'main-site': ['fridge'] } }])
  }

  public async redirectOnPageProducts(){
    await this.redirectOnPage(['/main-site', { outlets: { 'main-site': ['product'] } }])
  }

  private async redirectOnPage(path: any[]) {
    if (!await this.router.navigate(path)) {
      if (this.authActivateService.SessionIsValid()) {
        window.location.reload();
      }
    }
  }
}
