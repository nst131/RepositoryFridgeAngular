import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FridgeModel } from '../../fridge-model/models/fridge-model.model';
import { FridgeModelService } from '../../fridge-model/services/fridge-model.service';
import { User } from '../../user/models/user.model';
import { UserService } from '../../user/models/user.services';
import { Fridge } from '../models/fridge.model';
import { UpdateFridge } from '../models/update-fridge.model';
import { FridgeService } from '../services/fridge.service';

@Component({
  selector: 'app-update-fridge',
  templateUrl: './update-fridge.component.html',
  styleUrls: ['./update-fridge.component.css'],
  providers: [FridgeService, FridgeModelService, UserService]
})
export class UpdateFridgeComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public fridge: Fridge;
  public response: any;

  public allUsers: Array<User>;
  public allFridgeModels: Array<FridgeModel>
  private subscription: Subscription[];

  public error: boolean = false;
  public errorMessage: string = '';

  constructor(private fridgeService: FridgeService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fridgeModelService: FridgeModelService,
    private userService: UserService) {

    this.form = new FormGroup({});
    this.fridge = new Fridge(Number.NaN, "", "", "");
    this.allUsers = [];
    this.allFridgeModels = [];
    this.subscription = [];

    this.form = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      fridgeModelId: new FormControl("", [Validators.required]),
      userId: new FormControl("", [Validators.required]),
    });
  }

  public ngOnInit() {
    let id: number = this.activateRoute.snapshot.params['id'];
    if (id == 0) {
      this.redirectOnPageException();
    }

    let subGetFridge: Subscription = this.fridgeService.getFridge(id).subscribe((data: Fridge) => {
      this.fridge = data;

      this.form.controls['id'].setValue(this.fridge.id);
      this.form.controls['name'].setValue(this.fridge.name);

      let subGetAllFridgeModels: Subscription = this.fridgeModelService.getFridgeModelces().subscribe({
        next: (data: Array<FridgeModel>) => {
          this.allFridgeModels = data;
          let currentIdFridgeModel = this.allFridgeModels.filter(x => x.name == this.fridge.modelName)[0].id;
          this.form.controls['fridgeModelId'].setValue(currentIdFridgeModel);
        }
      })

      let subGetAllUsers: Subscription = this.userService.getUserces().subscribe({
        next: (data: Array<User>) => {
          this.allUsers = data;
          let currentIdUser = this.allUsers.filter(x => x.userName == this.fridge.ownerName)[0].id;
          this.form.controls['userId'].setValue(currentIdUser);
        }
      })

      this.subscription.push(subGetAllFridgeModels, subGetAllUsers);
    });

    this.subscription.push(subGetFridge)
  }

  private redirectOnPageException() {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['Exception'] } }]);
  }

  private redirectBack() {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['fridge'] } }]);
  }

  public onSubmit() {
    if (this.form.valid) {
      let obg: UpdateFridge = this.form.value;
      let updateFridge: UpdateFridge = new UpdateFridge(obg.id, obg.name, obg.fridgeModelId, obg.userId);
      let subUpdateFridge: Subscription = this.fridgeService.updateFridge(updateFridge).subscribe({
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
