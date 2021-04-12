import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import { MatDialog } from '@angular/material/dialog';
import {Injectable} from '@angular/core';
import {SpinnerService} from './spinner/spinner.service';
import {UnknownComponent} from './unknown/unknown.component';

/**
 * Base service that can be extended by implementing services.  Logs errors and starts spinner for long requests.
 *
 * @author Travis Schmidt
 */
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

  /**
   * Makes POST request and returns JSON result.
   *
   * @param url - url path to call
   * @param data - data to be passed
   * @param msg - message to display in spinner
   */
  post<T>(url: string , data: any, msg?: string): Observable<T> {
    return this.http.post<T>(this.base + url, data).pipe(this.catchError, this.startSpinner(msg));
  }

  /**
   * Makes POST request and returns text result.
   *
   * @param url - url path to call
   * @param data - data to be passed
   * @param msg - message to display in spinner
   */
  postText(url: string , data: any, msg?: string): Observable<string> {
    return this.http.post(this.base + url, data, {responseType: 'text'})
      .pipe(this.catchError, this.startSpinner(msg));
  }

  /**
   * Makes GET request and returns JSON result.
   *
   * @param url - url path to call
   * @param msg - message to display in spinner
   */
  get<T>(url: string, msg?: string): Observable<T> {
    return this.http.get(this.base + url).pipe(this.catchError, this.startSpinner(msg));
  }

  /**
   * Makes GET request and returns text result.
   *
   * @param url - url path to call
   * @param msg - message to display in spinner
   */
  getText(url: string, msg?: string): Observable<string> {
    return this.http.get(this.base + url, {responseType: 'text'})
      .pipe(this.catchError, this.startSpinner(msg));
  }

  /**
   * Makes DELETE request.
   *
   * @param url - url path to call
   * @param msg - message to display in spinner
   */
  delete(url: string, msg?: string): Observable<void> {
    return this.http.delete(this.base + url).pipe(this.catchError, this.startSpinner(msg));
  }

  /**
   * Makes PATCH request.
   *
   * @param url - url path to call
   * @param data - data to be passed
   * @param msg - message to display in spinner
   */
  patch(url: string, data: any, msg?: string): Observable<void> {
    return this.http.patch(this.base + url, data).pipe(this.catchError, this.startSpinner(msg));
  }

  /**
   * Starts the spinner displaying the passed message.
   *
   * @param msg - message to display
   */
  startSpinner(msg?: string) {
    if (msg) {
      this.spinner.start(msg);
      return this.stopSpinner;
    }
    return finalize(() => {});
  }

  /**
   * Handles error form server. If status is unknown displays unknown dialog. Otherwise error is logged
   * and thrown up the call chain.
   *
   * @param e - HttpErrorResponse
   * @param dialog - MatDialog
   */
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

