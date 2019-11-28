import { Injectable } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorSource = new Subject<any>();
  error$ = this.errorSource.asObservable();

  constructor() { }

  messageError(error: any) {
    this.errorSource.next(error);
  }
}
