import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../product/models/product.model';
import { UpdateProduct } from '../models/update-product';
import { ProductService } from '../services/product.services';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  providers: [ProductService]
})
export class UpdateProductComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public product: Product;
  public response: any;

  private subscription: Subscription[];
  public error: boolean = false;
  public errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private activateRoute: ActivatedRoute) {

    this.form = new FormGroup({});
    this.product = new Product(Number.NaN, "", Number.NaN);
    this.subscription = [];

    this.form = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      defaultQuantity: new FormControl(0, [Validators.required, Validators.pattern("^[0-9]*$")]),
      file: new FormControl("", [Validators.required])
    });
  }

  public ngOnInit() {
    let id: number = this.activateRoute.snapshot.params['id'];
    if (id == 0) {
      this.redirectOnPageException();
    }

    let subGetProduct: Subscription = this.productService.getProduct(id).subscribe((data: Product) => {
      this.product = data;

      this.form.controls['id'].setValue(this.product.id);
      this.form.controls['name'].setValue(this.product.name);
      this.form.controls['defaultQuantity'].setValue(this.product.defaultQuantity);
    });

    this.subscription.push(subGetProduct)
  }

  private redirectOnPageException() {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['Exception'] } }]);
  }

  private redirectBack() {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['product'] } }]);
  }

  public onSubmit() {
    if (this.form.valid) {
      let obg: UpdateProduct = this.form.value;
      let updateProduct: UpdateProduct = new UpdateProduct(obg.id, obg.name, obg.defaultQuantity);
      let subUpdateProduct: Subscription = this.productService.updateProduct(updateProduct).subscribe({
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
