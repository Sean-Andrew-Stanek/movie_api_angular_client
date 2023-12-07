import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

//API source
const apiURL = 'https://my-movie-db-1195f41cc20f.herokuapp.com/'

@Injectable({
  providedIn: 'root'
})


export class UserRegistrationService {

    //Inject the HttpClient Moducle into the constructor params
    //It will be accessable to the whole class
    constructor(private http: HttpClient) {}

    private tokenHeader(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            Authorization: 'Bearer' + token
        });
    }



    //Make the api call for the user registration endpoint
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        //TODO:  Either understand or fix this
        //possibly 'users'=> '/users' or fix the apiURL to end in a '/'
        return this.http.post(apiURL+'users',userDetails).pipe(
            catchError(this.handleError)
        );
    }

    //Login will return a token in string format
    public userLogin(userDetails: any): Observable<string> {
        return this.http.post(apiURL+'login', userDetails).pipe(
            catchError(this.handleError),
            map(this.extractResponseData),
            map((response:any) => response.token)
        );
    }

    //Returns all movies
    public getAllMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(
            apiURL + 'movies', 
            {headers: this.tokenHeader() }
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    //Returns a single movie
    public getMovie(movieID: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(
            apiURL+'movies/'+movieID, 
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    //Get a director by name
    public getDirector(directorName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(
            apiURL+'director/'+directorName,
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    //Get a genre by name
    public getGenre(genreName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(
            apiURL+'genre/'+genreName,
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    //Get user info &&&&&  NEED TO UPDATE HEROKU APP &^^&&&&&&
    public getUser(userID: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(
            apiURL+'users/'+userID,
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    //Get users' favorite movies
    //NEED TO UPDATE HEROKU APP!  IF THIS IS CALLED AND DOESN'T RESPOND, IT MAY BE AN API ISSUE
    public getFavoriteMovies(userID: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(
            apiURL+'users/'+userID,
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    //Put an update for a new favorite movie for a user
    public addFavoriteMovie(userID: string, movieID: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.post(
            apiURL+'users/'+userID+'/movies/'+movieID, 
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    //Put an update to the user data
    public updateUserInfo(userID: string, userInfo: any): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.put(
            apiURL+'users/'+userID, userInfo,
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    public deleteUser(userID: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.delete(
            apiURL+'users/'+userID,
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    public deleteFavoriteMovie (userID: string, movieID: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.delete(
            apiURL+'users/'+userID+'/movies/'+movieID,
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    //Non-typed response extraction
    private extractResponseData(res: any): any {
        const body = res;
        return body || {};
    }
    
    private handleError(error: HttpErrorResponse): any {
        if(error.error instanceof ErrorEvent) {
            console.error('An error has occurred: ', error.error.message)
        } else {
            console.error(
                `Error Status Code:\n    ${error.status},\n` + 
                `Error body is: \n    ${error.error}`
            )
        }
    }

}



export class FetchApiDataService {

  constructor() { }
}
