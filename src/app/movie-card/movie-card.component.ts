import { Component, Inject,  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

    movie: any;
    similarMovies: any[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dataService: DataService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<MovieCardComponent>,
    ) {
        this.movie = this.data.movie;
        this.similarMovies = dataService.filteredMovies('genre', this.movie.genre.name).slice(0,5);
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
