import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponentComponent } from "src/app/page-not-found-component/page-not-found-component.component";
import { CreateProductComponent } from "../create-product/create-product.component";
import { ProductComponent } from "../product.component";
import { UpdateProductComponent } from "../update-product/update-product.component";

const routes: Routes = [
      {
            path: '', component: ProductComponent,
      },
      {
            path: 'update-product/:id', component: UpdateProductComponent,
      },
      {
            path: 'create-product', component: CreateProductComponent,
      },
      {
            path: '**', component: PageNotFoundComponentComponent,
      }
]


@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
})
export class ProductRoutingModule { }