import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {

    movies: any[] = []
    currentMovies: any[] = [];
    currentMoviesSubscription: Subscription = new Subscription();

    constructor(
        public dataService: DataService,
        public fetchApiData: FetchApiDataService,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.login()
        this.getMovies();
        this.currentMoviesSubscription = this.dataService.currentMovies$.subscribe(
            currentMovies=> this.currentMovies = currentMovies
        );
    }

    ngOnDestroy(): void {
        this.currentMoviesSubscription.unsubscribe();
    }

/*     currentMoviesListener() {
        this.currentMovies = this.dataService.currentMovies;
    } */

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

    //Attempts to login
    //TODO:  Send to login if fail
    login(){
        this.dataService.signin();
    }

    isFavorite(movie: any): boolean {
        return this.dataService.getFavoriteMovies().indexOf(movie._id) >=0;
    }

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

    openDirectorCardDialog(director: any): void {
        this.dialog.open(DirectorCardComponent, {
            width: "80%",
            height: "80%",
            data: {director}
        })
    }

    openMovieCardDialog(movie: any): void {
        this.dialog.open(MovieCardComponent, {
            width: "80%",
            height: "80%",
            data: {movie}
        });
    }

    openGenreCardDialog(genre: any): void {
        this.dialog.open(GenreCardComponent, {
            width: "80%",
            height: "80%",
            data: {genre}
        });
    }
}
