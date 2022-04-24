import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateProduct } from '../models/create-product';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.services';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers: [ProductService]
})
export class CreateProductComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public product: Product;

  public response: any;
  private subscription: Subscription[];
  public error: boolean = false;
  public errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private router: Router) {

    this.form = new FormGroup({});
    this.product = new Product(Number.NaN, "", Number.NaN);
    this.subscription = [];

    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      defaultQuantity: new FormControl(0, [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }

  public ngOnInit() { }

  private redirectOnPageException() {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['Exception'] } }]);
  }

  private redirectBack() {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['product'] } }]);
  }

  public onSubmit() {
    if (this.form.valid) {
      let obg: CreateProduct = this.form.value;
      let createProduct: CreateProduct = new CreateProduct(obg.name, obg.defaultQuantity);
      let subUpdateProduct: Subscription = this.productService.createProduct(createProduct).subscribe({
        next: (dataResponse: any) => {
          this.response = dataResponse;
          this.form.reset();
          this.redirectBack();
        },
        error: (err) => {
          let errors = err.error.errors;
          if (errors) {
            for (var i in errors) {
              if (errors.hasOwnProperty(i) && typeof (i) !== 'function') {
                this.errorMessage = errors[i][0].split('Path')[0];
                this.error = true;
                break;
              }
            }
          }
          else {
            this.errorMessage = '';
            this.error = false;
            this.redirectOnPageException();
          }
        }
      });
      this.subscription.push(subUpdateProduct);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }
}
