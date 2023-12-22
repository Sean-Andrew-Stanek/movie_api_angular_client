import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
//Imports the API calls
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';

/**
 * @description Component representing the profile view of the user.
 * @selector: 'app-profile-view'
 * @templateUrl: './profile-view.component.html'
 * @styleUrls: ['../movie-card/movie-card.component.scss', './profile-view.component.scss']
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['../movie-card/movie-card.component.scss', './profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit{

    /** Fields */
    user: any;
    favoriteMovies: any[] = [];
    usernameForm: FormGroup;
    passwordForm: FormGroup;
    emailForm: FormGroup;
    birthdayForm: FormGroup;


    /** Triggers */
    @ViewChild('usernameMenuTrigger') usernameMenuTrigger: MatMenuTrigger | undefined;
    @ViewChild('passwordMenuTrigger') passwordMenuTrigger: MatMenuTrigger | undefined;
    @ViewChild('emailMenuTrigger') emailMenuTrigger: MatMenuTrigger | undefined;
    @ViewChild('birthdayMenuTrigger') birthdayMenuTrigger: MatMenuTrigger | undefined;


    /**
    * @constructor
    * @param {UserRegistrationService} userRegistrationAPI - Service for user registration API calls.
    * @param {FormBuilder} fb - Angular's FormBuilder for building forms.
    * @param {DataService} dataService - Service for handling shared data between components.
    * @param {FetchApiDataService} fetchApiData - Service for fetching API data.
    * @param {DatePipe} datePipe - Angular's DatePipe for date formatting.
    * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service for notifications.
    * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
    * @param {MatDialogRef<MovieCardComponent>} dialogRef - Reference to the dialog for closing.
    */
    constructor(
        public userRegistrationAPI: UserRegistrationService,
        private fb: FormBuilder,
        private dataService: DataService,
        public fetchApiData: FetchApiDataService,
        private datePipe: DatePipe,
        public snackBar: MatSnackBar,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<MovieCardComponent>,
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

        this.favoriteMovies = dataService.filteredMovies('favoriteMovies', '').slice(0,5);
        
    }

    /**
    * @description Lifecycle hook called after component initialization.
    * Gets the user from the data service.
    */
    ngOnInit(): void {
        this.getUser();
    }

    /**
    * @description Gets the user from the data service and formats the birthday.
    */
    getUser(): void {
        const localUser = this.dataService.getUser();

        if(localUser){
            this.user = localUser;
        } else {
            //This should never happen except in testing
            //I'm not even sure if it can get here with an empty object
            console.log('No current user: please sign in');
        }
        
        //changes the birthday into a readable form
        this.user.birthday = this.datePipe.transform(this.user.birthday, 'MM/dd/yyyy')

    }

    /**
    * @description Opens the movie card dialog for a given movie.
    * @param {any} movie - The movie data.
    */
    openMovieCardDialog(movie: any): void {
        console.log(movie);
        this.dialog.open(MovieCardComponent, {
            width: "80%",
            height: "80%",
            data: {movie}
        });
        this.dialogRef.close();
    }

    /**
    * @description Generic method to open a menu trigger.
    * @param {MatMenuTrigger} trigger - The MatMenuTrigger to be opened.
    */
    openMenu(trigger: MatMenuTrigger) {
        if(trigger)
            trigger.openMenu();
    }

    /**
    * @description Updates a user field using the API and displays a success or error message.
    * @param {string} field - The field to be updated.
    * @param {any} value - The new value for the field.
    */
    updateField(field: string, value: any): void {
        const postData: Record<string, any> = {};
        postData[field] = value;

        this.userRegistrationAPI.updateUserInfo(this.user._id, postData).subscribe(() => {
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

    /**
    * @description Handles the submission of the username form.
    * Updates the username if the form is valid and closes the menu trigger.
    */
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

    /**
    * @description Handles the submission of the birthday form.
    * Updates the birthday if the form is valid and closes the menu trigger.
    */
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

    /**
    * @description Handles the submission of the email form.
    * Updates the email if the form is valid and closes the menu trigger.
    */
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

    /**
    * @description Handles the submission of the password form.
    * Updates the password if the form is valid and closes the menu trigger.
    */
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
