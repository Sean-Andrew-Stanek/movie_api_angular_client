import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { DataService } from '../data.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

    searchText: string = '';

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private dataService: DataService
    ){}

    sendMessage() {
        this.dataService.filteredMovies('navSearch', this.searchText);
    }

    navProfile():void {
        this.dialog.open(ProfileViewComponent, {
            width: "80%",
            height: "80%",
        });
    }

    navSignout():void {
        this.dataService.signout();
        this.router.navigate(['welcome']);
    }

    navHome():void {
        this.router.navigate(['movies']);
    }

}
