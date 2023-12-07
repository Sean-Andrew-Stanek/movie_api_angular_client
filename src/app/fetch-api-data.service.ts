import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

//API source
const apiURL = 'https://my-movie-db-1195f41cc20f.herokuapp.com'


@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {

    //Inject the HttpClient Moducle into the constructor params
    //It will be accessable to the whole class
    constructor(private http: HttpClient) {}

    //Make the api call for the user registration endpoint
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        //TODO:  Either understand or fix this
        //possibly 'users'=> '/users' or fix the apiURL to end in a '/'
        return this.http.post(apiURL+'users',userDetails).pipe(
            catchError(this.handleError)
        );
    }

    public getAllMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiURL + 'movies', {headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + token
            }
        )}).pipe(
            map(this.extractResponseData),catchError(this.handleError)
        );
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
