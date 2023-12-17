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

  constructor() { 
    this.user = {};
    this.movies = [];
  }
}
