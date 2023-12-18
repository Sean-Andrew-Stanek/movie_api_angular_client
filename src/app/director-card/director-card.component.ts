import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['../movie-card/movie-card.component.scss']
})
export class DirectorCardComponent {
    
    director: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private datePipe: DatePipe
        ) {
            this.director = this.data.director;
        }

    ngOnInit(): void {
        if(this.director.birth)
            this.director.birth = this.datePipe.transform(this.director.birth, 'dd/MM/yyyy')

        if(this.director.death)
            this.director.death = this.datePipe.transform(this.director.death, 'dd/MM/yyyy')

        //Generic image if none is provided
        if(!this.director.image)
            this.director.image = 'assets/director.PNG';
    }

}
