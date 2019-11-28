import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreatePublicationComponent } from '../create-publication/create-publication.component';
import { PublicationService } from '../../services/publication.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  publications: any[];
  showResults: boolean = null;

  constructor(
    public dialog: MatDialog,
    private publicationService: PublicationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getPublicationsByUser();
  }

  getPublicationsByUser() {
    const userLogged = this.authService.getUserLogged();
    this.publicationService.getPublicationsByUser(userLogged.id).subscribe(
      res => {
        this.publications = res;
        if (this.publications.length === 0) {
          this.showResults = true;
        } else {
          this.showResults = false;
        }
      });
  }

  openModalCreatePublication(): void {
    const dialogRef = this.dialog.open(CreatePublicationComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPublicationsByUser();
    });
  }

}
