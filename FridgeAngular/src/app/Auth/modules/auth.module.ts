import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthComponent } from '../auth/auth.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent ,
    
  ],
  imports: [
    AuthRoutingModule,

    CommonModule,//is a feature module from BrouserModule(*ngIf and a lot of more)
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule
  ]
})
export class AuthModule { }
