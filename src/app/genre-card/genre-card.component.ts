import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['../movie-card/movie-card.component.scss']
})
export class GenreCardComponent {

    genre: any;
    similarMovies: any[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dataService: DataService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<MovieCardComponent>,
    ) {
        this.genre = this.data.genre;

        if(!this.genre.image)
            this.genre.image = 'assets/genre.PNG';

        this.similarMovies = dataService.filteredMovies('genre', this.genre.name).slice(0,5);

        
    }

    openMovieCardDialog(movie: any): void {
        this.dialog.open(MovieCardComponent, {
            width: "80%",
            height: "80%",
            data: {movie}
        });
        this.dialogRef.close();
    }

}
