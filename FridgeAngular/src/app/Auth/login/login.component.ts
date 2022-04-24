import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../validators/email.validators';
import { loadRolesService } from '../services/load-roles.service';
import { LoginModel } from '../models/login.model';
import { loginService } from '../services/login.service';
import { AuthActivateService } from '../services/auth-activate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [loadRolesService, loginService]
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public roles: string[];
  public response: any;
  public messageError: string;
  public error: boolean;
  private subscription: Subscription;

  constructor(private rolesService: loadRolesService,
    private login: loginService,
    private authActivateService: AuthActivateService) {
    this.loginForm = new FormGroup({});
    this.roles = [];
    this.messageError = "";
    this.error = false;
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.roles = this.rolesService.getRoles();
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.minLength(3), emailValidator]),
      password: new FormControl(null, [Validators.required])
    });
  };

  onSubmit() {
    if (this.loginForm.valid) {
      let obj = this.loginForm.value;
      this.subscription = this.login.tryLogin(new LoginModel(obj.email, obj.password)).subscribe(x => {
        if (x.error) {
          this.messageError = x.messageError;
          this.error = true;
          this.loginForm.reset({ role: "User" });
        }
        else {
          x.subscribe((data: { response: string; }) => this.response = data.response);
          this.error = false;
          this.loginForm.reset();
          this.authActivateService.redirectOnMainSite();
        }
      });
    }
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
