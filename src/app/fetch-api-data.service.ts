import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import mockdata from './mockdata';
import { DataService } from './data.service';

//API source
const apiURL = 'https://my-movie-db-1195f41cc20f.herokuapp.com/'

/**
 * @description Service for user registration operations.
 * @injectable
 */
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

    /**
    * @constructor
    * @param {HttpClient} http - Angular's HttpClient module for making HTTP requests.
    * @param {DataService} dataService - Service for handling shared data between components.
    */
    constructor(
        private http: HttpClient,
        private dataService: DataService,
    ){}

    /**
    * @description Create HttpHeaders with the Authorization token.
    * @returns {HttpHeaders} - HttpHeaders with Authorization token.
    * @private
    */
    private tokenHeader(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            Authorization: 'Bearer ' + token
        });
    }

    /**
    * @description Make an API call for user registration.
    * @param {any} userDetails - User details for registration.
    * @returns {Observable<any>} - Observable for the API response.
    */
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiURL+'users',userDetails).pipe(
            catchError(this.handleError)
        );
    }

    /**
    * @description Make an API call for user login.
    * @param {any} userDetails - User details for login.
    * @returns {Observable<string>} - Observable for the API response containing the user token.
    */
    public userLogin(userDetails: any): Observable<string> {
        return this.http.post(apiURL+'login', userDetails, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).pipe(
            catchError(this.handleError),
            map((resData: any) => {
                if(resData.user) {
                    //Save user / token to localStorage
                    localStorage.setItem('user', JSON.stringify(resData.user));
                    localStorage.setItem('token', resData.token);
                    this.dataService.setUser(resData.user);
                    
                    return JSON.stringify(resData.user);
                } else {
                    throw new Error('No such user');
                }
            })
        );
    }

    /**
    * @description Make an API call to update user information.
    * @param {string} userID - ID of the user to be updated.
    * @param {any} userInfo - New user information.
    * @returns {Observable<any>} - Observable for the API response.
    */
    public updateUserInfo(userID: string, userInfo: any): Observable<any> {
        return this.http.put(
            apiURL+'users/'+userID, userInfo,
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    /**
    * @description Make an API call to delete a user.
    * @param {string} userID - ID of the user to be deleted.
    * @returns {Observable<any>} - Observable for the API response.
    */
    public deleteUser(userID: string): Observable<any> {
        return this.http.delete(
            apiURL+'users/'+userID,
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    /**
    * @description Extract non-typed response data from the API response.
    * @param {any} res - API response.
    * @returns {any} - Extracted response data.
    * @private
    */
    private extractResponseData(res: any): any {
        const body = res;
        return body || {};
    }

    /**
    * @description Handle HTTP errors and log them.
    * @param {HttpErrorResponse} error - HTTP error response.
    * @returns {any} - Error details.
    * @private
    */
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

/**
 * @description Service for fetching data from the API.
 * @injectable
 */
@Injectable({
    providedIn: 'root'
  })
export class FetchApiDataService {

    /** Boolean flag for testing mode. */
    public isTesting = false;

    /**
    * @constructor
    * @param {HttpClient} http - Angular's HttpClient module for making HTTP requests.
    */
    constructor(private http: HttpClient) {}

    /**
    * @description Create HttpHeaders with the Authorization token.
    * @returns {HttpHeaders} - HttpHeaders with Authorization token.
    * @private
    */
    private tokenHeader(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            Authorization: 'Bearer ' + token
        });
    }

    /**
    * @description Make an API call to add a favorite movie for a user.
    * @param {string} userID - ID of the user.
    * @param {string} movieID - ID of the movie to be added to favorites.
    * @returns {Observable<any>} - Observable for the API response.
    */
    public addFavoriteMovie(userID: string, movieID: string): Observable<any> {
        return this.http.post(
            apiURL+'users/'+userID+'/movies/'+movieID, {},
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

  
    /**
    * @description Make an API call to retrieve all movies.
    * @returns {Observable<any>} - Observable for the API response containing all movies.
    */

    public getAllMovies(): Observable<any> {
        if(this.isTesting){
            console.log('Loading Test Data');
            return of(mockdata);
        }else{
            return this.http.get(
                apiURL + 'movies', 
                {headers: this.tokenHeader() }
            ).pipe(
                map(this.extractResponseData),
                catchError(this.handleError)
            );
        }
    }

    /**
    * @description Make an API call to retrieve a single movie.
    * @param {string} movieID - ID of the movie to be retrieved.
    * @returns {Observable<any>} - Observable for the API response containing the requested movie.
    */
    public getMovie(movieID: string): Observable<any> {
        return this.http.get(
            apiURL+'movies/'+movieID, 
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    /**
    * @description Make an API call to retrieve a director by name.
    * @param {string} directorName - Name of the director to be retrieved.
    * @returns {Observable<any>} - Observable for the API response containing the requested director.
    */
    public getDirector(directorName: string): Observable<any> {
        return this.http.get(
            apiURL+'director/'+directorName,
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    /**
    * @description Make an API call to retrieve a genre by name.
    * @param {string} genreName - Name of the genre to be retrieved.
    * @returns {Observable<any>} - Observable for the API response containing the requested genre.
    */
    public getGenre(genreName: string): Observable<any> {
        return this.http.get(
            apiURL+'genre/'+genreName,
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

    /**
    * @description Extract non-typed response data from the API response.
    * @param {any} res - API response.
    * @returns {any} - Extracted response data.
    * @private
    */
    private extractResponseData(res: any): any {
        const body = res;
        return body || {};
    }
    
    /**
    * @description Handle HTTP errors and log them.
    * @param {HttpErrorResponse} error - HTTP error response.
    * @returns {any} - Error details.
    * @private
    */
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

    /**
    * @description Make an API call to delete a favorite movie for a user.
    * @param {string} userID - ID of the user.
    * @param {string} movieID - ID of the movie to be removed from favorites.
    * @returns {Observable<any>} - Observable for the API response.
    */
    public deleteFavoriteMovie (userID: string, movieID: string): Observable<any> {
        return this.http.delete(
            apiURL+'users/'+userID+'/movies/'+movieID,
            {headers: this.tokenHeader()}
        ).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        )
    }

}
