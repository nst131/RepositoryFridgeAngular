import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';

const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'auth'},
  {path: 'auth', loadChildren: () => import("./Auth/modules/auth.module").then(mod => mod.AuthModule)},
  {path: 'main-site', loadChildren:() => import("./MainSite/modules/main-site.module").then(mod => mod.MainSiteModule) },
  {path: '**', component: PageNotFoundComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
