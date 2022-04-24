import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainSiteGuardService } from "src/app/Auth/services/guard.service";
import { MainSiteComponent } from "../main-site/main-site.component";

const routes: Routes = [
    {path: '', component: MainSiteComponent, 
    canActivateChild: [MainSiteGuardService],
    children:[
        {
            path: 'fridge', loadChildren: () => import("../Entities/fridge/modules/fridge.module").then(mod => mod.FridgeModule), outlet: 'main-site',
        },
        {
            path: 'product', loadChildren: () => import("../Entities/product/modules/product.module").then(mod => mod.ProductModule), outlet: 'main-site',
        }
    ]}
]

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
  })
  export class MainSiteRoutingModule { }