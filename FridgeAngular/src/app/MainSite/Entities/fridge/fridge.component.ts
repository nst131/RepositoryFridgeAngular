import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthActivateService } from 'src/app/Auth/services/auth-activate.service';
import { Roles } from 'src/app/models/roles.enum';
import { Fridge } from './models/fridge.model';
import { FridgeService } from './services/fridge.service';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css'],
  providers: [FridgeService]
})
export class FridgeComponent implements OnInit, OnDestroy {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate!: TemplateRef<any>;
  public fridges: Array<Fridge>;
  public fridgesName: Array<string>;
  public fridge: Fridge;
  private subscription: Subscription[];

  constructor(private fridgeService: FridgeService, private router: Router) {
    this.fridges = new Array<Fridge>();
    this.fridgesName = [];
    this.fridge = new Fridge(Number.NaN,"","","");
    this.subscription = [];
  }

  private loadFridges(): void {
    let subLoadFridges: Subscription = this.fridgeService.getFridgeces().subscribe({
      next: (data: Array<Fridge>) => {
        this.fridgesName = [];
        this.fridges = data;
        for (let key in data[0]) {
          if (key == 'id') continue;

          this.fridgesName.push(key.charAt(0).toUpperCase() + key.slice(1));
        }
      },
      error: (err) => {
        if (err.status == '403') {
          alert("Don't have acceess");
        }
        else {
          throw new Error("Cann't get Fridges")
        }
      }
    })

    this.subscription.push(subLoadFridges);
  }

  public deleteFridge(id: number): void {
    let deleteFridgeSubscription = this.fridgeService.deleteFridge(id).subscribe({
      next: () => { this.loadFridges() },
      error: (err) => {
        if (err.status == '403')
          alert("Don't have access")
      },
    })

    this.subscription.push(deleteFridgeSubscription);
  }

  public ngOnInit(): void {
    this.loadFridges();
  }

  public loadTemplate(fridge: Fridge): TemplateRef<any> {
    this.fridge = fridge;
    return this.readOnlyTemplate;
  }

  public redirectOnEditFridge(id: number) {
    let role: string = AuthActivateService.getSession()?.role ?? "";
    if (role == "") {
      alert("Don't have access");
      return;
    }

    switch (role) {
      case Roles.Administrator:
        this.routeOnEditFridge(id);
        break;
      default: alert("Don't have access");
    }
  }

  public redirectOnCreateFridge(){
    let role: string = AuthActivateService.getSession()?.role ?? "";
    if (role == "") {
      alert("Don't have access");
      return;
    }

    switch (role) {
      case Roles.Administrator:
        this.routeOnCreateFridge();
        break;
      default: alert("Don't have access");
    }
  }

  public redirectOnShowProductIntoFridge(id: number): void{
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['fridge', 'show-products-into-fridge', id] } }])
  }

  private routeOnCreateFridge(): void{
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['fridge', 'create-fridge'] } }])
  }

  private routeOnEditFridge(id: number): void {
    this.router.navigate(['/main-site', { outlets: { 'main-site': ['fridge', 'update-fridge', id] } }]);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((x) => { x.unsubscribe() });
  }
}
