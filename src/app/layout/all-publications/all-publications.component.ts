import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'app-all-publications',
  templateUrl: './all-publications.component.html',
  styleUrls: ['./all-publications.component.scss']
})
export class AllPublicationsComponent implements OnInit {

  publications: any[];
  showResults: boolean = null;

  constructor(
    private publicationService: PublicationService
  ) { }

  ngOnInit() {
    this.getPublications();
  }

  getPublications() {
    this.publicationService.getAllPublications().subscribe(
      res => {
        this.publications = res;
        if (this.publications.length === 0) {
          this.showResults = true;
        } else {
          this.showResults = false;
        }
      });
  }

}
