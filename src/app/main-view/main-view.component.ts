import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {

    movies: any[] = [];

    constructor(
        private dataService: DataService,
        public fetchApiData: FetchApiDataService,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(): void {
        const localMovies = this.dataService.getMovies();

        if(localMovies.length !== 0){
            this.movies = localMovies;
        } else {
            this.fetchApiData.getAllMovies().subscribe((resp: any) => {
                console.log(resp)
                this.movies = resp;
                this.dataService.setMovies(resp);
                return this.movies;
                });
        }
    }

    openMovieCardDialog(movie: any): void {
        this.dialog.open(MovieCardComponent, {
            width: "80%",
            height: "80%",
            data: {movie}
        });
    }
}
