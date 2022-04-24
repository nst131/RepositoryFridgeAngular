import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoutesService } from 'src/app/MainSite/services/routes.service';
import { FridgeModel } from '../../fridge-model/models/fridge-model.model';
import { FridgeModelService } from '../../fridge-model/services/fridge-model.service';
import { User } from '../../user/models/user.model';
import { UserService } from '../../user/models/user.services';
import { CreateFridge } from '../models/create-fridge.model';
import { Fridge } from '../models/fridge.model';
import { FridgeService } from '../services/fridge.service';

@Component({
  selector: 'app-create-fridge',
  templateUrl: './create-fridge.component.html',
  styleUrls: ['./create-fridge.component.css'],
  providers: [FridgeService, FridgeModelService, UserService]
})
export class CreateFridgeComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public fridge: Fridge;

  public allUsers: Array<User>;
  public allFridgeModels: Array<FridgeModel>;
  public response: any;
  private subscription: Subscription[];

  public error: boolean = false;
  public errorMessage: string = '';

  constructor(
    private fridgeService: FridgeService,
    private router: Router,
    private fridgeModelService: FridgeModelService,
    private userService: UserService) {

    this.form = new FormGroup({});
    this.fridge = new Fridge(Number.NaN, "", "", "");
    this.allFridgeModels = [];
    this.allUsers = [];
    this.subscription = [];

    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      fridgeModelId: new FormControl("", [Validators.required]),
      userId: new FormControl("", [Validators.required])
    });
  }

  public ngOnInit() {
    let subGetAllFridgeModels: Subscription = this.fridgeModelService.getFridgeModelces().subscribe({
      next: (data: Array<FridgeModel>) => {
        this.allFridgeModels = data;
        this.form.controls['fridgeModelId'].setValue(this.allFridgeModels[0].id);
      }
    })

    let subGetAllUsers: Subscription = this.userService.getUserces().subscribe({
      next: (data: Array<User>) => {
        this.allUsers = data;
        this.form.controls['userId'].setValue(this.allUsers[0].id);
      }
    })

    this.subscription.push(subGetAllFridgeModels, subGetAllUsers);
  }

  private redirectOnPageException() {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['Exception'] } }]);
  }

  private redirectBack() {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['fridge'] } }]);
  }

  public onSubmit() {
    if (this.form.valid) {
      let obg: CreateFridge = this.form.value;
      let createFridge: CreateFridge = new CreateFridge(obg.name, obg.fridgeModelId, obg.userId);
      let subUpdateFridge: Subscription = this.fridgeService.createFridge(createFridge).subscribe({
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
      this.subscription.push(subUpdateFridge);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }
}
