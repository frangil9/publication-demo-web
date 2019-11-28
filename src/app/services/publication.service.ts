import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { Publication } from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http: HttpClient) { }

  savePublication(publication: Publication): Observable<any> {
    let body = JSON.stringify(publication);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl + '/publications', body, { headers });
  }

  getAllPublications(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/publications');
  }

  getPublicationsByUser(userId: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `/publications/user/${userId}`);
  }

}
