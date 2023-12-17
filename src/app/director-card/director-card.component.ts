import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent {
    
    director: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.director = this.data.director;
    }

    ngOnInit(): void {
        if(!this.director.image)
            this.director.image = 'src/director.PNG';
    }

}
