import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private errorService: ErrorService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = {};
    const token = this.authService.getToken();
    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }
    const clonedRequest = req.clone({ setHeaders: headers });

    return next.handle(clonedRequest).pipe(
      catchError((err, caught) => {

        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              this.authService.doLogout();
              break;
            default:
              this.errorService.messageError(err);
          }
        }
        return observableThrowError(err);
      })
    );
  }
}
