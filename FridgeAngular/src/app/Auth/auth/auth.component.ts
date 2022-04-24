import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements AfterViewInit {

  constructor(private router: Router, private cdRef: ChangeDetectorRef) { }

  public ngAfterViewInit(): void {
    if (this.router.url == '/auth') {
      this.router.navigate(['/auth', { outlets: { 'auth': ['Login'] } }]);
    }
  }
}
