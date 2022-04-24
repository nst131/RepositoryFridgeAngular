import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../validators/email.validators';
import { RegistrationUserService } from '../services/registration-user.service';
import { RegistrationUserModel } from '../models/registrationUser.model';
import { AuthActivateService } from '../services/auth-activate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationUserService]
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public registrationForm: FormGroup;
  public response: any;
  public messageError: string;
  public showError: boolean;
  private subscription: Subscription;

  constructor(private registrationUserService: RegistrationUserService,
    private authActivateService: AuthActivateService) {
    this.registrationForm = new FormGroup({});
    this.messageError = "";
    this.showError = false;
    this.subscription =new Subscription();
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.minLength(3), emailValidator]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required])
    });
  };

  onSubmit() {
    if (this.registrationForm.valid) {
      let obj = this.registrationForm.value;
      this.subscription = this.registrationUserService.tryRegistrationUser(new RegistrationUserModel(obj.email, obj.name, obj.password)).subscribe(x => {
        if (x.error) {
          this.messageError = x.messageError;
          this.showError = true;
          this.registrationForm.reset()
        }
        else {
          x.subscribe((data: any) => { this.response = data.response });
          this.showError = false;
          this.registrationForm.reset();
          this.authActivateService.redirectOnMainSite();
        }
      });
    }
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
