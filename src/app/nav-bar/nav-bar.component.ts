import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(
    private router: Router,
  ){}

  navProfile():void {

  }

  navSignout():void {
    this.router.navigate(['welcome']);
  }

  navHome():void {
    this.router.navigate(['movies']);
  }

}
