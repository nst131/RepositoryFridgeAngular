import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../product/models/product.model';
import { ProductService } from '../../product/services/product.services';
import { AddProductIntoFridge } from '../show-products-into-fridge/models/add-product-into-fridge.model';
import { ProductsIntoFridgeService } from '../show-products-into-fridge/services/products-into-fridge.services';
import { ProductIntoFridgeWhereQuantityZero } from './models/ProductIntoFridgeWhereQuantityZero.model';
import { ProcedureService } from './service/procedure.service';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css'],
  providers: [ProcedureService, ProductsIntoFridgeService, ProductService]
})
export class ProcedureComponent implements OnInit, OnDestroy {

  public form: FormGroup = new FormGroup({});
  public productIntoFrigeZero: ProductIntoFridgeWhereQuantityZero = new ProductIntoFridgeWhereQuantityZero(0,0,0,'',0,'');

  public fridgeName: string = '...'
  public arrayProducts: Array<Product> = [];
  public response: any;
  private subscription: Subscription[] = [];

  public showForm: boolean = true;

  constructor(
    private procedureService: ProcedureService,
    private productIntoFridgeService: ProductsIntoFridgeService,
    private productService: ProductService,
    private router: Router) {

      this.form = new FormGroup({
        productId: new FormControl(0, [Validators.required]),
        fridgeId: new FormControl(0, [Validators.required]),
        quantity: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]*$')])
      });
  }

  public ngOnInit() {
    let subGetAllProductsWhereQuantityZero: Subscription = this.procedureService.SearchProductsInFridgeWhereZero().subscribe({
      next: (data: ProductIntoFridgeWhereQuantityZero) => {
        this.productIntoFrigeZero = data;

        if(data == null){
          this.showForm = false;
          return;
        }

        this.form.controls['productId'].setValue(this.productIntoFrigeZero.productId);
        this.form.controls['fridgeId'].setValue(this.productIntoFrigeZero.fridgeId);
        this.form.controls['quantity'].setValue(this.productIntoFrigeZero.defaultQuantity); //DefaultQuantity
        this.fridgeName = this.productIntoFrigeZero.fridgeName; //Show whose fridge
      },
      error: () => {
        this.redirectOnPageException();
      }
    })

    let subGetAllProducts: Subscription = this.productService.getProductces().subscribe({
      next:(data: Array<Product>) => {
        this.arrayProducts = data;
      }
    })

    this.subscription.push(subGetAllProductsWhereQuantityZero, subGetAllProducts);
  }

  private redirectOnPageException() {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['Exception'] } }]);
  }

  private redirectBack() {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['fridge'] } }]);
  }

  public onSubmit() {
    if (this.form.valid) {
      let obg: AddProductIntoFridge = this.form.value;
      let addProductIntoFridge: AddProductIntoFridge = new AddProductIntoFridge(obg.productId, obg.fridgeId, obg.quantity);
      let subAddProductIntoFridge: Subscription = this.productIntoFridgeService.AddProductIntoFridge(addProductIntoFridge).subscribe(x => {
        if (x.error) {
          this.redirectOnPageException();
        }
        else {
          this.response = x.response;
          this.form.reset;
          this.redirectBack();
        }
      });
      this.subscription.push(subAddProductIntoFridge);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }  
}
