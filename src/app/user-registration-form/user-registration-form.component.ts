import { Component, Input } from '@angular/core';

//Closes the dialogue on success
import { MatDialogRef } from '@angular/material/dialog';
//Imports the API calls
import { UserRegistrationService } from '../fetch-api-data.service';
//Notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent {
    @Input() userData = { username: '', password: '', email: '', birthday: ''}

    constructor(
        public userRegistrationAPI: UserRegistrationService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar
    ){}

    //Sends form info to backend
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




