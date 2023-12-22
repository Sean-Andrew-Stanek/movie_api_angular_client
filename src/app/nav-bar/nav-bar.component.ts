import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { DataService } from '../data.service';

/**
 * @description Component representing the navigation bar.
 * @selector: 'app-nav-bar'
 * @templateUrl: './nav-bar.component.html'
 * @styleUrls: ['./nav-bar.component.scss']
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

    /** The search text entered by the user. */
    searchText: string = '';

    /** The user information. */
    user: any;

    /**
    * @constructor
    * @param {Router} router - Angular's Router service for navigation.
    * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
    * @param {DataService} dataService - Service for handling shared data between components.
    */
    constructor(
        private router: Router,
        private dialog: MatDialog,
        private dataService: DataService
    ){}

    /**
    * @description Checks if a user is currently signed in.
    * @returns {boolean} - True if a user is signed in, false otherwise.
    */
    hasUser(): boolean {
        return this.dataService.getUser() !== null && Object.keys(this.dataService.getUser()).length > 0;
    }

    /**
    * @description Sends a message to filter movies based on the search text.
    */
    sendMessage() {
        this.dataService.filteredMovies('navSearch', this.searchText);
    }

    /**
    * @description Navigates to the user profile view.
    */
    navProfile():void {
        this.dialog.open(ProfileViewComponent, {
            width: "80%",
            height: "80%",
        });
    }

    /**
    * @description Signs out the current user and navigates to the welcome page.
    */
    navSignout():void {
        this.dataService.signout();
        this.router.navigate(['welcome']);
    }

    /**
    * @description Navigates to the home (movies) page.
    */
    navHome():void {
        this.router.navigate(['movies']);
    }

}
