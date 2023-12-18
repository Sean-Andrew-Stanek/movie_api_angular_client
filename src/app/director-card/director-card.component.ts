import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { DataService } from '../data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['../movie-card/movie-card.component.scss']
})
export class DirectorCardComponent {
    
    director: any;
    similarMovies: any[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private datePipe: DatePipe,
        private dataService: DataService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<MovieCardComponent>,
        ) {
            this.director = this.data.director;
            this.similarMovies = dataService.filteredMovies('director', this.director.name).slice(0,5);
        }
        

    ngOnInit(): void {
        if(this.director.birth)
            this.director.birth = this.datePipe.transform(this.director.birth, 'MM/dd/yyyy')

        if(this.director.death)
            this.director.death = this.datePipe.transform(this.director.death, 'MM/dd/yyyy')

        //Generic image if none is provided
        if(!this.director.image)
            this.director.image = 'assets/director.PNG';
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
