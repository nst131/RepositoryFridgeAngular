import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponentComponent } from "src/app/page-not-found-component/page-not-found-component.component";
import { CreateFridgeComponent } from "../create-fridge/create-fridge.component";
import { FridgeComponent } from "../fridge.component";
import { ProcedureComponent } from "../procedure/procedure.component";
import { AddProductIntoFridgeComponent } from "../show-products-into-fridge/add-product-onto-fridge/add-product-onto-fridge.component";
import { ShowProductIntoFridgeComponent } from "../show-products-into-fridge/show-products-into-fridge.component";
import { UpdateProductIntoFridgeComponent } from "../show-products-into-fridge/update-product-onto-fridge/update-product-onto-fridge.component";
import { UpdateFridgeComponent } from "../update-fridge/update-fridge.component";

const routes: Routes = [
      {
            path: '', component: FridgeComponent,
      },
      {
            path: 'procedure', component: ProcedureComponent,
      },    
      {
            path: 'update-fridge/:id', component: UpdateFridgeComponent,
      },
      {
            path: 'create-fridge', component: CreateFridgeComponent,
      },
      {
            path: 'show-products-into-fridge/:id', component: ShowProductIntoFridgeComponent,
      },
      {
            path: 'update-products-into-fridge/:fridgeId/:fridgeProductId', component: UpdateProductIntoFridgeComponent
      },
      {
            path: 'add-products-into-fridge/:id', component:AddProductIntoFridgeComponent
      },
      {
            path: '**', component: PageNotFoundComponentComponent,
      }
]


@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
})
export class FridgeRoutingModule { }