import { Injectable } from '@angular/core';
import { FetchApiDataService } from './fetch-api-data.service';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * @description Service providing data handling for movies and user information.
 * @@Injectable
 */

@Injectable({
  providedIn: 'root'
})

export class DataService {

    /** Array holding movie data. */
    private movies: any[] = [];

    /** Object holding user data. */
    private user: any = {};

    /** Subject for observing changes in the current movie list. */
    private currentMovies: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    /** Observable for the current movie list. */
    public currentMovies$: Observable<any[]> = this.currentMovies.asObservable();

    /**
     * @constructor
     * @param {FetchApiDataService} fetchApiDataService - Service for fetching data from the API.
     */

    constructor(
        private fetchApiDataService: FetchApiDataService,
    ) {
        this.user = {};
        this.movies = [];
    }

    /**
     * @description Attempt to sign in the user by retrieving user data from localStorage.
     */
    signin(): void {
        const userString = localStorage.getItem('user');
        if (userString) {
        this.user = JSON.parse(userString);
        }
    }

    /**
     * @description Check if a user is currently signed in.
     * @returns {boolean} - True if a user is signed in, false otherwise.
     */
    hasUser(): boolean {
        return Object.keys(this.user).length > 0;
    }

    /**
     * @description Sign out the user by clearing user data and localStorage.
     */
    signout(): void {
        this.user = {};
        localStorage.clear();
    }

    /**
     * @description Set the movie data and notify observers.
     * @param {any[]} data - Array of movie data.
     */
    setMovies(data: any[]): void {
        this.movies = data;
        this.currentMovies.next(data);
    }

    /**
     * @description Get the currently stored movie data.
     * @returns {any[]} - Array of movie data.
     */
    getMovies(): any[] {
        return this.movies;
    }

    /**
     * @description Set the user data.
     * @param {any} data - User data.
     */
    setUser(data: any): void {
        this.user = data;
    }

    /**
     * @description Get the currently stored user data.
     * @returns {any} - User data.
     */
    getUser(): any {
        return this.user;
    }

    /**
     * @description Get the list of favorite movies from the user data.
     * @returns {any[]} - Array of favorite movies.
     */
    getFavoriteMovies(): any[] {
        return this.user.favoriteMovies;
    }

    //Add by _id 
    addFavoriteMovie(id: string):void {
        //REMOVE FROM USER
        this.user.favoriteMovies.push(id);
        
        //REMOVE FROM SERVER
        this.fetchApiDataService.addFavoriteMovie(this.user._id, id).subscribe(response=>
            {
                //UPDATE USER
                this.user = response;
                localStorage.setItem('user', response);
            }, error => {
                console.error('Error removing favorite: ', error);
            })
    }

    /**
     * @description Remove a favorite movie by its ID. This method removes the movie both from the user's favorites and the server.
     * @param {string} id - The ID of the movie to be removed from favorites.
     */
    removeFavoriteMovie(id: string): void {
        // REMOVE FROM USER
        const index = this.user.favoriteMovies.indexOf(id);
        this.user.favoriteMovies.splice(index, 1);
    
        // REMOVE FROM SERVER
        this.fetchApiDataService.deleteFavoriteMovie(this.user._id, id).subscribe(
        (response) => {
            // UPDATE USER
            this.user = response;
            localStorage.setItem('user', JSON.stringify(response));
        },
        (error) => {
            console.error('Error removing favorite: ', error);
        }
        );
    }
    
    /**
     * @description Filter movies based on a specified field and value.
     * @param {string} field - The field by which to filter the movies (e.g., 'director', 'genre', 'favoriteMovies', 'navSearch').
     * @param {string} value - The value to use for filtering.
     * @returns {any[]} - An array of movies that match the specified filter criteria.
     */
    filteredMovies(field: string, value: string): any[] {
        const movies = this.getMovies();
    
        switch (field) {
        case 'director':
            return movies.filter((movie) => movie.director.name == value);
        case 'genre':
            return movies.filter((movie) => movie.genre.name == value);
        case 'favoriteMovies':
            return movies.filter((movie) => this.user.favoriteMovies.indexOf(movie._id) >= 0);
        case 'navSearch': {
            const searchValue = value.toLowerCase();
    
            const newFavMovies = movies.filter(
            (movie) =>
                movie.genre.name.toLowerCase().includes(searchValue) ||
                movie.director.name.toLowerCase().includes(searchValue) ||
                movie.title.toLowerCase().includes(searchValue)
            );
            this.currentMovies.next(newFavMovies);
            return newFavMovies;
        }
        default:
            break;
        }
        return [];
    }


}
