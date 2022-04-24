import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetProductIntoFridge } from '../models/get-product-into-fridge.model';
import { UpdateProductIntoFridge } from '../models/update-product-into-fridge.model';
import { ProductsIntoFridgeService } from '../services/products-into-fridge.services';

@Component({
  selector: 'app-update-product-onto-fridge',
  templateUrl: './update-product-onto-fridge.component.html',
  styleUrls: ['./update-product-onto-fridge.component.css'],
  providers:[ProductsIntoFridgeService]
})
export class UpdateProductIntoFridgeComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public product: GetProductIntoFridge;
  public response: any;

  private subscription: Subscription[];
  private fridgeId: number;
  private fridgeProductId: number;

  constructor(
    private productIntoFridgeService: ProductsIntoFridgeService,
    private router: Router,
    private activateRoute: ActivatedRoute) {

    this.form = new FormGroup({});
    this.product = new GetProductIntoFridge(Number.NaN, Number.NaN, Number.NaN, Number.NaN);

    this.subscription = [];
    this.fridgeId = this.activateRoute.snapshot.params['fridgeId'];
    this.fridgeProductId = this.activateRoute.snapshot.params['fridgeProductId'];

    this.form = new FormGroup({
      fridgeProductId: new FormControl(0, [Validators.required]),
      quantity: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]*$')]),
    });
  }

  public ngOnInit() {

    let subGetProductIntoFridge: Subscription = this.productIntoFridgeService.getProductIntoFridge(this.fridgeProductId).subscribe({
      next:(data: GetProductIntoFridge) => {
        this.product = data;

        this.form.controls['fridgeProductId'].setValue(this.product.fridgeProductId);
        this.form.controls['quantity'].setValue(this.product.quantity);
      }
    })

    this.subscription.push(subGetProductIntoFridge)
  }

  public onSubmit() {
    if (this.form.valid) {
      let obg: UpdateProductIntoFridge = this.form.value;
      let updateObject: UpdateProductIntoFridge = new UpdateProductIntoFridge(obg.fridgeProductId, obg.quantity);
      let subUpdate: Subscription = this.productIntoFridgeService.updateProductIntoFridge(updateObject).subscribe(x => {
        if (x.error) {
          this.redirectOnPageException();
        }
        else {
          this.response = x.response;
          this.form.reset;
          this.redirectBack(this.fridgeId);
        }
      });
      this.subscription.push(subUpdate);
    }
  }

  private redirectOnPageException() {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['Exception'] } }]);
  }

  private redirectBack(id: number) {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['fridge', 'show-products-into-fridge', id] } }])
  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }
}
