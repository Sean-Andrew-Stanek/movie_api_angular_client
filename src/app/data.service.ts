import { Injectable } from '@angular/core';
import { FetchApiDataService } from './fetch-api-data.service';

//LATER - Add ng generate interface movie / user
//IMPORTANT:  THIS IS INSTANCE ONLY.  ALL LOCALSTORAGE IS IN THE API 
//EXCEPTION:  SIGNOUT
//EXCEPTION:  API is referenced here for favorited movie for UX reasons


@Injectable({
  providedIn: 'root'
})
export class DataService {

    private movies: any[] = [];
    private user: any = {};
    private currentMovies: any[] = [];


    constructor(
        private fetchApiDataService: FetchApiDataService,
    ){
        this.user = {};
        this.movies = [];
    }
   
    signin(): void {
        const userString = localStorage.getItem('user');
        if(userString)
            this.user = JSON.parse(userString);
    }

    signout(): void {
        this.user = {};
        localStorage.clear();
    }

    setMovies(data: any[]): void {
        this.movies = data
        this.currentMovies = data;
    }

    getMovies(): any[] {
        return this.movies;
    }

    getCurrentMovies(): any[] {
        return this.currentMovies;
    }

    setUser(data: any): void {
        this.user = data
    }

    getUser(): any {
        return this.user;
    }

    getFavoriteMovies() : any[] {
        return this.user.favoriteMovies;
    }

    //Add by _id 
    addFavoriteMovie(id: string):void {
        //REMOVE FROM USER
        this.user.favoriteMovies.push(id);
        
        //REMOVE FROM SERVER
        this.fetchApiDataService.addFavoriteMovie(this.user._id, id).subscribe(response=>
            {
                console.log('Added Favorite');
                //UPDATE USER
                this.user = response;
                localStorage.setItem('user', response);
            }, error => {
                console.error('Error removing favorite: ', error);
            })
    }

    //Remove by _id
    removeFavoriteMovie(id: string):void {
        //REMOVE FROM USER
        const index = this.user.favoriteMovies.indexOf(id);
        this.user.favoriteMovies.splice(index, 1);
        
        //REMOVE FROM SERVER
        this.fetchApiDataService.deleteFavoriteMovie(this.user._id, id).subscribe(response=>
            {
                console.log('Deleted Favorite');
                //UPDATE USER
                this.user = response;
                localStorage.setItem('user', response);
            }, error => {
                console.error('Error removing favorite: ', error);
            })
    }

    filteredMovies(field: string, value: string): any[] {
        
        const movies = this.getMovies();

        switch(field) {
            case 'director':
                return movies.filter(movie => movie.director.name == value);
            case 'genre':
                return movies.filter(movie => movie.genre.name == value);
            case 'favoriteMovies':
                return movies.filter(movie => this.user.favoriteMovies.indexOf(movie._id)>=0);
            case 'navSearch':
                console.log(value);
                this.currentMovies = this.searchAllObjects(movies, value);
                console.log(this.currentMovies);
                //This return doesn't matter.  This acts as a call to the main view
                return this.searchAllObjects(movies, value);
        }
        return [];
    }

    //Recursively look for a value in an object and the object's objects
    private searchAllObjects(array: any[], value: string): any[] {
        return array.filter(object => {
            for(const key in object) {
                if(object[key] ===value)
                    //We found a match, no need to go farther
                    return true;
                //Check if the key is an object because we need to check these fields as well
                else if (typeof object[key] === 'object')
                    //Recursively search the next object.  The return array will be truthy if there are results
                    return this.searchAllObjects([object[key]], value);
            }
            return false;
        })
    }

}
