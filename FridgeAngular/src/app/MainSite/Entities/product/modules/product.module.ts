import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateProductComponent } from "../create-product/create-product.component";
import { ProductComponent } from "../product.component";
import { UpdateProductComponent } from "../update-product/update-product.component";
import { ProductRoutingModule } from "./product-routing.module";

@NgModule({
      declarations: [
            ProductComponent,
            UpdateProductComponent,
            CreateProductComponent
      ],
      imports: [
            ProductRoutingModule,

            CommonModule,// is a feature module from BrouserModule(*ngIf and a lot of more)
            FormsModule,
            ReactiveFormsModule,
      ]
})
export class ProductModule { }