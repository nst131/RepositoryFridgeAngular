import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthActivateService } from 'src/app/Auth/services/auth-activate.service';
import { Roles } from 'src/app/models/roles.enum';
import { GetAllProductIntoFridge } from './models/get-all-product-into-fridge.model';
import { ProductsIntoFridgeService } from './services/products-into-fridge.services';

@Component({
  selector: 'app-show-products-into-getProductIntoFridge',
  templateUrl: './show-products-into-fridge.component.html',
  styleUrls: ['./show-products-into-fridge.component.css'],
  providers: [ProductsIntoFridgeService]
})
export class ShowProductIntoFridgeComponent implements OnInit, OnDestroy {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate!: TemplateRef<any>;
  public getProductIntoFridges: Array<GetAllProductIntoFridge>;
  public getProductIntoFridgesName: Array<string>;
  public getProductIntoFridge: GetAllProductIntoFridge;
  private subscription: Subscription[];
  private fridgeId: number;

  constructor(
    private productIntoFridgeService: ProductsIntoFridgeService,
    private router: Router,
    private acrivatedRoute: ActivatedRoute) {
    this.getProductIntoFridges = new Array<GetAllProductIntoFridge>();
    this.getProductIntoFridgesName = [];
    this.getProductIntoFridge = new GetAllProductIntoFridge(Number.NaN,Number.NaN,"",Number.NaN);
    this.subscription = [];
    this.fridgeId = this.acrivatedRoute.snapshot.params['id'];
  }

  private loadGetProductIntoFridges(): void {
    let subLoadGetProductIntoFridges: Subscription = this.productIntoFridgeService.getAllProductsIntoFridge(this.fridgeId).subscribe({
      next: (data: Array<GetAllProductIntoFridge>) => {
        this.getProductIntoFridgesName = [];
        this.getProductIntoFridges = data;
        for (let key in data[0]) {
          if (key == 'fridgeProductId' || key == 'productId') continue;

          this.getProductIntoFridgesName.push(key.charAt(0).toUpperCase() + key.slice(1));
        }
      },
      error: (err) => {
        if (err.status == '403') {
          alert("Don't have acceess");
        }
        else {
          throw new Error("Cann't get GetProductIntoFridges")
        }
      }
    })

    this.subscription.push(subLoadGetProductIntoFridges);
  }

  public deleteProductIntoFridge(fridgeProductId: number): void {
    let deleteGetProductIntoFridgeSubscription = this.productIntoFridgeService.deleteProductIntoFridge(fridgeProductId).subscribe({
      next: () => { this.loadGetProductIntoFridges() },
      error: (err) => {
        if (err.status = '403')
          alert("Don't have access")
      },
    })

    this.subscription.push(deleteGetProductIntoFridgeSubscription);
  }

  public ngOnInit(): void {
    this.loadGetProductIntoFridges();
  }

  public loadTemplate(getProductIntoFridge: GetAllProductIntoFridge): TemplateRef<any> {
    this.getProductIntoFridge = getProductIntoFridge;
    return this.readOnlyTemplate;
  }

  public redirectOnEditProductIntoFridge(fridgeProductId: number): void{
    let role: string = AuthActivateService.getSession()?.role ?? "";
    if (role == "") {
      alert("Don't have access");
      return;
    }

    switch (role) {
      case Roles.Administrator:
        this.routeOnEditProductIntoFridge(this.fridgeId, fridgeProductId);
        break;
      default: alert("Don't have access");
    }
  }

  public redirectOnAddProductIntoFridge(): void{
    let role: string = AuthActivateService.getSession()?.role ?? "";
    if (role == "") {
      alert("Don't have access");
      return;
    }

    switch (role) {
      case Roles.Administrator:
        this.routeOnAddProductIntoFridge(this.fridgeId);
        break;
      default: alert("Don't have access");
    }
  }

  private routeOnAddProductIntoFridge(id: number): void{
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['fridge', 'add-products-into-fridge', id] } }])
  }

  private routeOnEditProductIntoFridge(fridgeProductId: number, fridgeId: number): void {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['fridge', 'update-products-into-fridge', fridgeProductId, fridgeId] } }]);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((x) => { x.unsubscribe() });
  }
}
