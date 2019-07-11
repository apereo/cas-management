/**
 * Created by tsschmi on 4/25/17.
 */

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import { MatDialog } from '@angular/material/dialog';
import {Injectable} from '@angular/core';
import {UnknownComponent} from '../lib/unknown/unknown.component';

@Injectable({
  providedIn: 'root'
})
export class Service {

  base = '';

  constructor(protected http: HttpClient,
              protected dialog: MatDialog) {
  }

  post<T>(url: string , data: any): Observable<T> {
    return this.http.post<T>(this.base + url, data)
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  postText(url: string , data: any): Observable<string> {
    return this.http.post(this.base + url, data, {responseType: 'text'})
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  get<T>(url: string): Observable<T> {
    return this.http.get(this.base + url)
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  delete(url: string): Observable<void> {
    return this.http.delete(this.base + url)
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  getText(url: string): Observable<string> {
    return this.http.get(this.base + url, {responseType: 'text'})
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  patch(url: string, data: any): Observable<void> {
    return this.http.patch(this.base + url, data)
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  handleError(e: HttpErrorResponse, dialog: MatDialog): Observable<any> {
    if (e.status === 0) {
      dialog.open(UnknownComponent, {
        width: '500px',
        position: {top: '100px'}
      });
    } else {
      console.log('An error Occurred: ' + e.message);
      return throwError(e);
    }
  }
}

