import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProfileViewComponent } from '../profile-view/profile-view.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

    constructor(
        private router: Router,
        private dialog: MatDialog,
    ){}

    navProfile():void {
        this.dialog.open(ProfileViewComponent, {
            width: "80%",
            height: "80%",
        });
    }

    navSignout():void {
        this.router.navigate(['welcome']);
    }

    navHome():void {
        this.router.navigate(['movies']);
    }

}
