/**
 * Created by tsschmi on 4/25/17.
 */

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {MatDialog} from '@angular/material';
import {Injectable} from '@angular/core';
import {UnknownComponent} from '../lib/unknown/unknown.component';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(protected http: HttpClient,
              protected dialog: MatDialog) {

  }

  post<T>(url: string , data: any): Observable<T> {
    return this.http.post<T>(document.baseURI + url, data)
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  postText(url: string , data: any): Observable<String> {
    return this.http.post(document.baseURI + url, data, {responseType: 'text'})
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  get<T>(url: string): Observable<T> {
    return this.http.get(document.baseURI + url)
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  delete(url: string): Observable<void> {
    return this.http.delete(document.baseURI + url)
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  getText(url: string): Observable<String> {
    return this.http.get(document.baseURI + url, {responseType: 'text'})
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  handleError(e: HttpErrorResponse, dialog: MatDialog): Observable<any> {
    if (e.status === 0) {
      dialog.open(UnknownComponent, {
        width: '500px',
        position: {top: '100px'}
      })
    } else {
      console.log('An error Occurred: ' + e.message);
      return throwError(e);
    }
  }
}

