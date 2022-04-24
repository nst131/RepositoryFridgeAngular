import { NgModule } from "@angular/core";
import { MainSiteComponent } from "../main-site/main-site.component";
import { MainSiteRoutingModule } from "./main-site-routing.module";

@NgModule({
  declarations: [
    MainSiteComponent
  ],
  imports: [
    MainSiteRoutingModule,
  ]
})
export class MainSiteModule { }