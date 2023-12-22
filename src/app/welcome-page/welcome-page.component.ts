import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

/**
 * @description Component representing the welcome page of the application.
 * @selector: 'app-welcome-page'
 * @templateUrl: './welcome-page.component.html'
 * @styleUrls: ['./welcome-page.component.scss']
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit{

    /**
    * @constructor
    * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
    * @param {Router} router - Angular's Router service for navigation.
    * @param {DataService} dataService - Service for handling shared data between components.
    */
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private dataService: DataService,
    ) { }

    /**
    * @description Lifecycle hook called after component initialization.
    * Attempts to sign in the user and navigates to the movies page if a user is already signed in.
    */
    ngOnInit(): void {
        this.dataService.signin();
        if(this.dataService.hasUser())
            this.router.navigate(['movies']);
    }
    
    /**
    * @description Opens the user registration dialog when called.
    */
    openUserRegistrationDialog():void {
        this.dialog.open(UserRegistrationFormComponent, {
            width: '280px'
        });
    }

    /**
    * @description Opens the login dialog when called.
    */
    openLoginDialog():void {
        this.dialog.open(UserLoginFormComponent, {
            width: '280px'
        });
    }

}
