import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../product/models/product.model';
import { ProductService } from '../../../product/services/product.services';
import { AddProductIntoFridge } from '../models/add-product-into-fridge.model';
import { ProductsIntoFridgeService } from '../services/products-into-fridge.services';

@Component({
  selector: 'app-add-product-onto-productIntoFridge',
  templateUrl: './add-product-onto-fridge.component.html',
  styleUrls: ['./add-product-onto-fridge.component.css'],
  providers: [ProductsIntoFridgeService, ProductService]
})
export class AddProductIntoFridgeComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public productIntoFridge: AddProductIntoFridge;

  public arrayProduct: Array<Product>
  public response: any;
  private subscription: Subscription[];

  private id: number;

  constructor(
    private productIntoFridgeService: ProductsIntoFridgeService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.form = new FormGroup({});
    this.productIntoFridge = new AddProductIntoFridge(Number.NaN, Number.NaN, Number.NaN);
    this.arrayProduct = [];
    this.subscription = [];
    this.id = this.activatedRoute.snapshot.params['id'];

    this.form = new FormGroup({
      productId: new FormControl(0, [Validators.required]),
      fridgeId: new FormControl(0, [Validators.required]),
      quantity: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  public ngOnInit() {

    this.form.controls['fridgeId'].setValue(this.id);
    let subGetAllProducts: Subscription = this.productService.getProductces().subscribe({
      next:(data: Array<Product>) => {
        this.arrayProduct = data;
        this.form.controls['productId'].setValue(this.arrayProduct[0].id)
      }
    })

    this.subscription.push(subGetAllProducts);
  }

  private redirectOnPageException() {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['Exception'] } }]);
  }

  private redirectBack(id: number) {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['fridge', 'show-products-into-fridge', id] } }])
  }

  public onSubmit() {
    if (this.form.valid) {
      let obg: AddProductIntoFridge = this.form.value;
      let addProductIntoFridge: AddProductIntoFridge = new AddProductIntoFridge(obg.productId, obg.fridgeId, obg.quantity);
      let subaddProductIntoFridge: Subscription = this.productIntoFridgeService.AddProductIntoFridge(addProductIntoFridge).subscribe(x => {
        if (x.error) {
          this.redirectOnPageException();
        }
        else {
          this.response = x.response;
          this.form.reset;
          this.redirectBack(this.id);
        }
      });
      this.subscription.push(subaddProductIntoFridge);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }

}
