import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponentComponent } from 'src/app/page-not-found-component/page-not-found-component.component';
import { AuthComponent } from '../auth/auth.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { AuthSiteGuardService } from '../services/guard.service';

const routes: Routes = [
  {
    path: '', component: AuthComponent,
    canActivateChild: [AuthSiteGuardService],
    children: [
      {
        path: '', redirectTo: 'Login', pathMatch: 'full'
      },
      {
        path: 'Login', component: LoginComponent, outlet: 'auth'
      },
      {
        path: 'Registration', component: RegistrationComponent, outlet: 'auth'
      },
      {
        path: '**', component: PageNotFoundComponentComponent, outlet: 'auth'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }