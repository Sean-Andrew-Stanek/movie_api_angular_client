import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';


/**
 * @description Component representing a genre card.
 * @selector: 'app-genre-card'
 * @templateUrl: './genre-card.component.html'
 * @styleUrls: ['../movie-card/movie-card.component.scss']
 */
@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['../movie-card/movie-card.component.scss']
})
export class GenreCardComponent {

    /** The genre data associated with the card. */
    genre: any;
    /** List of similar movies to the genre. */
    similarMovies: any[];

    /**
    * @constructor
    * @param {any} data - Data injected into the component via MAT_DIALOG_DATA.
    * @param {DataService} dataService - Service for handling shared data between components.
    * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
    * @param {MatDialogRef<MovieCardComponent>} dialogRef - Reference to the dialog.
    */
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

    /**
    * @description Opens a dialog displaying details for a movie.
    * @param {any} movie - The movie for which details are to be displayed.
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
