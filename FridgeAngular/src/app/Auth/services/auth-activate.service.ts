import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionEnum } from 'src/app/models/session.enum';
import { ObjSession } from '../interfaces/obj-session.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthActivateService {
  constructor(private router: Router) { }

  public static getSession(): ObjSession | null {
    let item = sessionStorage.getItem(SessionEnum.UserSession);
    if (item != null) {
     let objSession : ObjSession = JSON.parse(item)
      if (objSession != null) {
        return objSession;
      }
    }

    return null;
  }

  public SessionIsValid(): boolean {
    let item = sessionStorage.getItem(SessionEnum.UserSession);
    if(item != null){
      return true;
    }

    return false;
  }

  public logoutService(): void {
    sessionStorage.removeItem(SessionEnum.UserSession)
  }

  public redirectOnAuth(): void {
    this.router.navigate(['/auth'])
  }

  public redirectOnMainSite(): void {
    this.router.navigate(["/main-site"])
  }

  public isLoggedIn(): Promise<boolean> {
    return new Promise(resolve => resolve(this.SessionIsValid()))
  }
}