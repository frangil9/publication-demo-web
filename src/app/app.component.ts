import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    private toastr: ToastrService,
    private errorService: ErrorService,
  ) {
    this.errorService.error$.subscribe(err => {
      this.toastr.error(err.error && err.error.message ? err.error.message : 'Error');
    });
  }
}
