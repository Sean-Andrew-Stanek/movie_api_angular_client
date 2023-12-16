import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'movie_api_angular_client';

    constructor(public dialog: MatDialog) { }

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

    openMoviesDialog(): void {
        this.dialog.open(MovieCardComponent, {
            width:'500px'
        });
    }
}
