import { Injectable} from '@angular/core';
import { FetchApiDataService } from './fetch-api-data.service';
import{ BehaviorSubject, Observable } from 'rxjs'

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
    
    private currentMovies: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    public currentMovies$: Observable<any[]> = this.currentMovies.asObservable();

    

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
        this.currentMovies.next(data);
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

    //Remove by _id
    removeFavoriteMovie(id: string):void {
        //REMOVE FROM USER
        const index = this.user.favoriteMovies.indexOf(id);
        this.user.favoriteMovies.splice(index, 1);
        
        //REMOVE FROM SERVER
        this.fetchApiDataService.deleteFavoriteMovie(this.user._id, id).subscribe(response=>
            {
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
            {    const searchValue = value.toLowerCase();
                
                const newFavMovies = movies.filter(movie => 
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
