import { Component, OnDestroy, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

/**
 * @description Component representing the main view of the application.
 * @selector: 'app-main-view'
 * @templateUrl: './main-view.component.html'
 * @styleUrls: ['./main-view.component.scss']
 */
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent implements OnInit, OnDestroy{

    /** List of all movies available. */
    movies: any[] = []
    /** List of movies to be displayed in the current view. */
    currentMovies: any[] = [];
    /** Subscription for changes in the currentMovies list. */
    currentMoviesSubscription: Subscription = new Subscription();

    /**
    * @constructor
    * @param {DataService} dataService - Service for handling shared data between components.
    * @param {FetchApiDataService} fetchApiData - Service for making API calls to fetch data.
    * @param {Router} router - Angular router service for navigation.
    * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
    */
    constructor(
        public dataService: DataService,
        public fetchApiData: FetchApiDataService,
        private router: Router,
        private dialog: MatDialog,
    ) { }

    /**
    * @description Lifecycle hook called when the component is initialized.
    * - Signs in the user.
    * - Redirects to the welcome page if the user is not signed in.
    * - Subscribes to changes in the currentMovies list.
    */
    ngOnInit(): void {
        this.dataService.signin();

        if(!this.dataService.hasUser())
            this.router.navigate(['welcome']);

        this.getMovies();
        this.currentMoviesSubscription = this.dataService.currentMovies$.subscribe(
            currentMovies=> this.currentMovies = currentMovies
        );
    }

    /**
    * @description Lifecycle hook called when the component is about to be destroyed.
    * - Unsubscribes from the currentMovies subscription.
    */
    ngOnDestroy(): void {
        this.currentMoviesSubscription.unsubscribe();
    }

    /**
    * @description Toggles the favorite status of a movie.
    * @param {any} movie - The movie to toggle the favorite status for.
    */
    toggleFavorite(movie: any) {
        const index = this.dataService.getFavoriteMovies().indexOf(movie._id);
        //If it is favorited, removed
        if(index !== -1){
            this.dataService.removeFavoriteMovie(movie._id);
        // otherwise, add
        }else{
            this.dataService.addFavoriteMovie(movie._id);
        }
    }

    /**
    * @description Checks if a movie is marked as a favorite.
    * @param {any} movie - The movie to check for favorite status.
    * @returns {boolean} - True if the movie is a favorite; false otherwise.
    */
    isFavorite(movie: any): boolean {
        return this.dataService.getFavoriteMovies().indexOf(movie._id) >=0;
    }

    /**
    * @description Fetches the list of movies.
    * - Retrieves from local storage if available; otherwise, makes an API call.
    */
    getMovies(): void {
        const localMovies = this.dataService.getMovies();

        if(localMovies.length !== 0){
            this.movies = localMovies;
        } else {
            this.fetchApiData.getAllMovies().subscribe((resp: any) => {
                this.movies = resp;
                this.dataService.setMovies(resp);
                return this.movies;
                });
        }
    }

    /**
    * @description Opens a dialog displaying details for a director.
    * @param {any} director - The director for which details are to be displayed.
    */
    openDirectorCardDialog(director: any): void {
        this.dialog.open(DirectorCardComponent, {
            width: "80%",
            height: "80%",
            data: {director}
        })
    }

    /**
    * @description Opens a dialog displaying details for a movie.
    * @param {any} movie - The movie for which details are to be displayed.
    */
    openMovieCardDialog(movie: any): void {
        this.dialog.open(MovieCardComponent, {
            width: "80%",
            height: "80%",
            data: {movie}
        });
    }

    /**
    * @description Opens a dialog displaying details for a genre.
    * @param {any} genre - The genre for which details are to be displayed.
    */
    openGenreCardDialog(genre: any): void {
        this.dialog.open(GenreCardComponent, {
            width: "80%",
            height: "80%",
            data: {genre}
        });
    }
}
