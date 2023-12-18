import { Component, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['../movie-card/movie-card.component.scss', './profile-view.component.scss']
})
export class ProfileViewComponent {

    user: any;
    favoriteMovies: any[] = [];
    usernameForm: FormGroup;
    passwordForm: FormGroup;

    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        public fetchApiData: FetchApiDataService,
    ){
        this.usernameForm = this.fb.group({
            newUsername: ['', [Validators.required]]
        });

        this.passwordForm = this.fb.group({
            newPassword: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    openMenu(): void {
        if(this.trigger)
           this.trigger.openMenu();
    }

    closeMenu(): void {
        if(this.trigger)
            this.trigger.closeMenu();
    }

    onUsernameSubmit(): void {
        if(this.usernameForm.valid) {
            const newUsername = this.usernameForm.get('newUsername')?.value;
            this.user.username = newUsername;
            this.closeMenu();
            ///ADD FETCHAPI
        }
    }

    onPasswordSubmit(): void {
        if(this.passwordForm.valid) {
            const newPassword = this.passwordForm.get('newPassword')?.value;
            this.user.password = newPassword;
            this.closeMenu();
            ///ADD FETCHAPI
        }
    }

    ngOnInit(): void {
        this.getUser();
    }

    getUser(): void {
        const localUser = this.dataService.getUser();

        if(localUser){
            this.user = localUser;
        } else {
            console.log('No current user: please sign in');
        }
        this.favoriteMovies = this.user.favoriteMovies;

    }

}
