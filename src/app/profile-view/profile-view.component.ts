import { Component, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
//Imports the API calls
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['../movie-card/movie-card.component.scss', './profile-view.component.scss']
})
export class ProfileViewComponent {

    //Fields
    user: any;
    favoriteMovies: any[] = [];
    usernameForm: FormGroup;
    passwordForm: FormGroup;
    emailForm: FormGroup;
    birthdayForm: FormGroup;


    //Triggers
    @ViewChild('usernameMenuTrigger') usernameMenuTrigger: MatMenuTrigger | undefined;
    @ViewChild('passwordMenuTrigger') passwordMenuTrigger: MatMenuTrigger | undefined;
    @ViewChild('emailMenuTrigger') emailMenuTrigger: MatMenuTrigger | undefined;
    @ViewChild('birthdayMenuTrigger') birthdayMenuTrigger: MatMenuTrigger | undefined;


    //Constructor
    constructor(
        public userRegistrationAPI: UserRegistrationService,
        private fb: FormBuilder,
        private dataService: DataService,
        public fetchApiData: FetchApiDataService,
        private datePipe: DatePipe,
        public snackBar: MatSnackBar,
    ){
        this.usernameForm = this.fb.group({
            newUsername: ['', [Validators.required]]
        });

        this.passwordForm = this.fb.group({
            newPassword: ['', [Validators.required, Validators.minLength(8)]]
        });

        this.birthdayForm = this.fb.group({
            newBirthday: ['', [Validators.required]]
        });

        this.emailForm = this.fb.group({
            newEmail: ['', [Validators.required, Validators.email]]
        });
    }

    //Get the user from the data service
    ngOnInit(): void {
        this.getUser();
        console.log(this.user._id);
    }

    getUser(): void {
        const localUser = this.dataService.getUser();

        if(localUser){
            this.user = localUser;
        } else {
            //This should never happen except in testing
            //I'm not even sure if it can get here with an empty object
            console.log('No current user: please sign in');
        }

        //Makes favorite movies a bit easier to get to and cleans up the code
        this.favoriteMovies = this.user.favoriteMovies;
        //changes the birthday into a readable form
        this.user.birthday = this.datePipe.transform(this.user.birthday, 'MM/dd/yyyy')

    }

    //Generic opener
    openMenu(trigger: MatMenuTrigger) {
        if(trigger)
            trigger.openMenu();
    }

    updateField(field: string, value: any): void {
        let postData: Record<string, any> = {};
        postData[field] = value;

        this.userRegistrationAPI.updateUserInfo(this.user._id, postData).subscribe((result) => {
            this.snackBar.open('Updated!', 'OK', {
                duration: 2000
            });
        }, (error) => {
            this.snackBar.open('Not Updated', 'OK', {
                duration: 2000
            });
            console.error('Update Error: ', error);
        })
    }

    //Submit button logic
    onUsernameSubmit(): void {
        if(this.usernameForm.valid) {
            const newUsername = this.usernameForm.get('newUsername')?.value;
            this.user.username = newUsername;
            //Pass the new dateObject to the api
            this.updateField('username', newUsername);

            if(this.usernameMenuTrigger)
                this.usernameMenuTrigger.closeMenu();
            
        }
    }

    onBirthdaySubmit(): void {
        if(this.birthdayForm.valid) {
            const newBirthday = this.birthdayForm.get('newBirthday')?.value;
            const dateObject = new Date(newBirthday);

            this.user.birthday = this.datePipe.transform(newBirthday, 'MM/dd/yyyy');
            
            //Pass the new dateObject to the api
            this.updateField('birthday', dateObject);

            if(this.birthdayMenuTrigger)
                this.birthdayMenuTrigger.closeMenu();
            
        }
    }

    onEmailSubmit(): void {
        if(this.emailForm.valid) {
            const newEmail = this.emailForm.get('newEmail')?.value;
            this.user.email = newEmail;
            //Pass the new dateObject to the api
            this.updateField('email', newEmail);
            if(this.emailMenuTrigger)
                this.emailMenuTrigger.closeMenu();
            
        }
    }

    onPasswordSubmit(): void {
        if(this.passwordForm.valid) {
            const newPassword = this.passwordForm.get('newPassword')?.value;
            this.user.password = newPassword;
            //Pass the new dateObject to the api
            this.updateField('password', newPassword);
            if(this.passwordMenuTrigger)
                this.passwordMenuTrigger.closeMenu();
        }
    }





}
