import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthActivateService } from 'src/app/Auth/services/auth-activate.service';
import { Roles } from 'src/app/models/roles.enum';
import { Product } from './models/product.model';
import { ProductService } from './services/product.services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit, OnDestroy {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate!: TemplateRef<any>;
  public products: Array<Product>;
  public productsName: Array<string>;
  public product: Product;

  private subscription: Subscription[];

  constructor(
    private productService: ProductService,
    private router: Router) {
    this.products = new Array<Product>();
    this.productsName = [];
    this.product = new Product(Number.NaN,"",Number.NaN);
    this.subscription = [];
  }

  private loadProducts(): void {
    let subLoadProducts: Subscription = this.productService.getProductces().subscribe({
      next: (data: Array<Product>) => {
        this.productsName = [];
        this.products = data;
        for (let key in data[0]) {
          if (key == 'id') continue;

          this.productsName.push(key.charAt(0).toUpperCase() + key.slice(1));
        }
      },
      error: (err) => {
        if (err.status == '403') {
          alert("Don't have acceess");
        }
        else {
          throw new Error("Cann't get Products")
        }
      }
    })

    this.subscription.push(subLoadProducts);
  }

  public deleteProduct(id: number): void {
    let deleteProductSubscription = this.productService.deleteProduct(id).subscribe({
      next: () => { this.loadProducts() },
      error: (err) => {
        if (err.status == '403')
          alert("Don't have access")

        if(err.status == '500')
          alert("Cannot delete because constraint On Delete No Action")
      },
    })

    this.subscription.push(deleteProductSubscription);
  }

  public ngOnInit(): void {
    this.loadProducts();
  }

  public loadTemplate(product: Product): TemplateRef<any> {
    this.product = product;
    return this.readOnlyTemplate;
  }

  public redirectOnEditProduct(id: number) {
    let role: string = AuthActivateService.getSession()?.role ?? "";
    if (role == "") {
      alert("Don't have access");
      return;
    }

    switch (role) {
      case Roles.Administrator:
        this.routeOnEditProduct(id);
        break;
      default: alert("Don't have access");
    }
  }

  public redirectOnCreateProduct(){
    let role: string = AuthActivateService.getSession()?.role ?? "";
    if (role == "") {
      alert("Don't have access");
      return;
    }

    switch (role) {
      case Roles.Administrator:
        this.routeOnCreateProduct();
        break;
      default: alert("Don't have access");
    }
  }

  private routeOnCreateProduct(){
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['product', 'create-product'] } }])
  }

  private routeOnEditProduct(id: number): void {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['product', 'update-product', id] } }]);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((x) => { x.unsubscribe() });
  }
}
