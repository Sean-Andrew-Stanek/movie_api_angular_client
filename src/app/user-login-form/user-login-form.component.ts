import { Component, OnInit, Input } from '@angular/core';

//Closes the dialogue on success
import { MatDialogRef } from '@angular/material/dialog';
//Imports the API calls
import { UserRegistrationService } from '../fetch-api-data.service';
//Notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit{
    @Input() userData = { username: '', password: ''}

    constructor(
        public userRegistrationAPI: UserRegistrationService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        private router: Router,
    ){}
    
    ngOnInit(): void {}

    //Sends form info to backend
    loginUser():void {
        this.userRegistrationAPI.userLogin(this.userData).subscribe((result) => {
            this.dialogRef.close();
            this.snackBar.open(result, 'OK', {
                duration: 2000
            });
            this.router.navigate(['movies']);
        }, (result) => {
            this.snackBar.open(result, 'OK', {
                duration: 2000
            });
        });
    }
}
