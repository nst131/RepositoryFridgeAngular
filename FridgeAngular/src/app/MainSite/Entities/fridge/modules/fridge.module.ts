import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateFridgeComponent } from "../create-fridge/create-fridge.component";
import { FridgeComponent } from "../fridge.component";
import { ProcedureComponent } from "../procedure/procedure.component";
import { AddProductIntoFridgeComponent } from "../show-products-into-fridge/add-product-onto-fridge/add-product-onto-fridge.component";
import { ShowProductIntoFridgeComponent } from "../show-products-into-fridge/show-products-into-fridge.component";
import { UpdateProductIntoFridgeComponent } from "../show-products-into-fridge/update-product-onto-fridge/update-product-onto-fridge.component";
import { UpdateFridgeComponent } from "../update-fridge/update-fridge.component";
import { FridgeRoutingModule } from "./fridge-routing.module";

@NgModule({
      declarations: [
            FridgeComponent,
            UpdateFridgeComponent,
            CreateFridgeComponent,
            ShowProductIntoFridgeComponent,
            AddProductIntoFridgeComponent,
            UpdateProductIntoFridgeComponent,
            ProcedureComponent
      ],
      imports: [
            FridgeRoutingModule,

            CommonModule,// is a feature module from BrouserModule(*ngIf and a lot of more)
            FormsModule,
            ReactiveFormsModule,
      ]
})
export class FridgeModule { }