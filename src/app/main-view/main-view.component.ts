import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { DataService } from '../data.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {

    movies: any[] = [];

    constructor(
        private dataService: DataService,
        public fetchApiData: FetchApiDataService
    ) { }

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(): void {
        const localMovies = this.dataService.getMovies();

        if(localMovies){
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

}
