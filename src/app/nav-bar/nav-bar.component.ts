import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
    searchText: string = '';
    user: any;


    constructor(
        private router: Router,
        private dialog: MatDialog,
        private dataService: DataService
    ){}

    hasUser(): boolean {
        return this.dataService.getUser() !== null && Object.keys(this.dataService.getUser()).length > 0;
    }

    ngOnInit() {
    }

    sendMessage() {
        this.dataService.filteredMovies('navSearch', this.searchText);
    }

    navProfile():void {
        this.dialog.open(ProfileViewComponent, {
            width: "80%",
            height: "80%",
        });
    }

    navSignout():void {
        this.dataService.signout();
        this.router.navigate(['welcome']);
    }

    navHome():void {
        this.router.navigate(['movies']);
    }

}
