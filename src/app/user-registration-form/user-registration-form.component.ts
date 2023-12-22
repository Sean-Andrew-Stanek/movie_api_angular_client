import { Component, Input } from '@angular/core';

//Closes the dialogue on success
import { MatDialogRef } from '@angular/material/dialog';
//Imports the API calls
import { UserRegistrationService } from '../fetch-api-data.service';
//Notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';


/**
* @description Component representing the user registration form.
* @selector: 'app-user-registration-form'
* @templateUrl: './user-registration-form.component.html'
* @styleUrls: ['./user-registration-form.component.scss']
*/
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent {
    /** Input for user data including username, password, email, and birthday. */
    @Input() userData = { username: '', password: '', email: '', birthday: ''}

    /**
    * @constructor
    * @param {UserRegistrationService} userRegistrationAPI - Service for user registration API calls.
    * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the dialog for closing.
    * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service for notifications.
    */
    constructor(
        public userRegistrationAPI: UserRegistrationService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar
    ){}

    /**
    * @description Sends user registration form information to the backend.
    * Closes the dialog on success and displays a success message. Shows an error message on failure.
    */
    registerUser():void {
        this.userRegistrationAPI.userRegistration(this.userData).subscribe(() => {
            this.dialogRef.close();
            this.snackBar.open('Signed Up!  Welcome!', 'OK', {
                duration: 2000
            });
        }, () => {
            this.snackBar.open('Sign Up Failed', 'OK', {
                duration: 2000
            });
        });
    }
}




