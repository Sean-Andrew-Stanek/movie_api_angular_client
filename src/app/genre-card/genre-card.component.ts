import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['../movie-card/movie-card.component.scss']
})
export class GenreCardComponent {

    genre: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        ) {
            this.genre = this.data.genre;

            if(!this.genre.image)
                this.genre.image = 'assets/genre.PNG';
        }


}
