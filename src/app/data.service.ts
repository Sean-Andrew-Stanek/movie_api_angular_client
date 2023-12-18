import { Injectable } from '@angular/core';

//LATER - Add ng generate interface movie / user


@Injectable({
  providedIn: 'root'
})
export class DataService {

    private movies: any[] = [];
    private user: any = {};

    setMovies(data: any[]): void {
        this.movies = data
    }

    getMovies(): any[] {
        return this.movies;
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

    addFavoriteMovie(data: number):void {
        //ADD TO USER
        //ADD TO SERVER
        //UPDATE USER
    }

    removeFavoriteMovie(data: number):void {
        //REMOVE FROM USER
        //REMOVE FROM SERVER
        //UPDATE USER
    }

    filteredMovies(field: string, value: string): any[] {
        
        const movies = this.getMovies();

        switch(field) {
            case 'director':
                return movies.filter(movie => movie.director.name == value);
            case 'genre':
                return movies.filter(movie => movie.genre.name == value);
            case 'favoriteMovies':
                //TODO
            case 'navSearch':
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

    constructor() { 
        this.user = {};
        this.movies = [];
    }
}
