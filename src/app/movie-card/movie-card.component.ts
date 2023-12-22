import { Component, Inject,  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


/**
 * @description Component representing the movie card.
 * @selector: 'app-movie-card'
 * @templateUrl: './movie-card.component.html'
 * @styleUrls: ['./movie-card.component.scss']
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

    /** The movie data displayed in the card. */
    movie: any;
    /** List of similar movies based on the genre of the current movie. */
    similarMovies: any[];

    /**
    * @constructor
    * @param {any} data - Data injected into the component, specifically the movie information.
    * @param {DataService} dataService - Service for handling shared data between components.
    * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
    * @param {MatDialogRef<MovieCardComponent>} dialogRef - Reference to the dialog opened by this component.
    */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dataService: DataService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<MovieCardComponent>,
    ) {
        this.movie = this.data.movie;
        this.similarMovies = dataService.filteredMovies('genre', this.movie.genre.name).slice(0,5);
    }

    /**
    * @description Opens a dialog displaying details for a similar movie.
    * @param {any} movie - The similar movie to be displayed.
    */
    openMovieCardDialog(movie: any): void {
        this.dialog.open(MovieCardComponent, {
            width: "80%",
            height: "80%",
            data: {movie}
        });
        this.dialogRef.close();
    }


    

    

}
