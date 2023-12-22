
//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular - Material
import { MatInputModule }  from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';

//Local
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { DirectorCardComponent } from './director-card/director-card.component';
import { GenreCardComponent } from './genre-card/genre-card.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';


const appRoutes: Routes = [
    { path: 'welcome', component: WelcomePageComponent},
    { path: 'movies', component: MainViewComponent},
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix'},
];

/**
 * @module AppModule
 * @description Root module of the Angular application.
 */
@NgModule({
    declarations: [
      /** @component AppComponent */
      AppComponent,
  
      /** @component UserRegistrationFormComponent */
      UserRegistrationFormComponent,
  
      /** @component UserLoginFormComponent */
      UserLoginFormComponent,
  
      /** @component MovieCardComponent */
      MovieCardComponent,
  
      /** @component WelcomePageComponent */
      WelcomePageComponent,
  
      /** @component NavBarComponent */
      NavBarComponent,
  
      /** @component MainViewComponent */
      MainViewComponent,
  
      /** @component DirectorCardComponent */
      DirectorCardComponent,
  
      /** @component GenreCardComponent */
      GenreCardComponent,
  
      /** @component ProfileViewComponent */
      ProfileViewComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    MatMenuModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
