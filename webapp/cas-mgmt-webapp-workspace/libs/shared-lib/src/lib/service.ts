/**
 * Created by tsschmi on 4/25/17.
 */

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {MatDialog} from '@angular/material/dialog';
import {Injectable} from '@angular/core';
import {UnknownComponent} from '../lib/unknown/unknown.component';
import {SpinnerService} from './spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class Service {

  base = '../';

  catchError;
  stopSpinner;

  constructor(protected http: HttpClient,
              protected dialog: MatDialog,
              protected spinner: SpinnerService) {
    this.catchError = catchError((e) => this.handleError(e, dialog));
    this.stopSpinner = finalize(() => this.spinner.stop());
  }

  post<T>(url: string , data: any, msg?: string): Observable<T> {
    return this.http.post<T>(this.base + url, data).pipe(this.catchError, this.startSpinner(msg));
  }

  postText(url: string , data: any, msg?: string): Observable<string> {
    return this.http.post(this.base + url, data, {responseType: 'text'})
      .pipe(this.catchError, this.startSpinner(msg));
  }

  get<T>(url: string, msg?: string): Observable<T> {
    return this.http.get(this.base + url).pipe(this.catchError, this.startSpinner(msg));
  }

  delete(url: string, msg?: string): Observable<void> {
    return this.http.delete(this.base + url).pipe(this.catchError, this.startSpinner(msg));
  }

  getText(url: string, msg?: string): Observable<string> {
    return this.http.get(this.base + url, {responseType: 'text'})
      .pipe(this.catchError, this.startSpinner(msg));
  }

  patch(url: string, data: any, msg?: string): Observable<void> {
    return this.http.patch(this.base + url, data).pipe(this.catchError, this.startSpinner(msg));
  }

  startSpinner(msg?: string) {
    if (msg) {
      this.spinner.start(msg);
      return this.stopSpinner;
    }
    return finalize(() => {});
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

