import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit{

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private dataService: DataService,
    ) { }

    ngOnInit(): void {
        this.dataService.signin();
        console.log(this.dataService.getUser());
        if(this.dataService.hasUser())
            this.router.navigate(['movies']);
    }
    
    //This function will open the dialog when the signup button is clicked
    openUserRegistrationDialog():void {
        this.dialog.open(UserRegistrationFormComponent, {
            width: '280px'
        });
    }

    openLoginDialog():void {
        this.dialog.open(UserLoginFormComponent, {
            width: '280px'
        });
    }

}
