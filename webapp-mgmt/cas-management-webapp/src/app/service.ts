/**
 * Created by tsschmi on 4/25/17.
 */

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';

export abstract class Service {

  constructor(protected http: HttpClient) {

  }

  post<T>(url: string , data: any): Observable<T> {
    return this.http.post<T>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  postText(url: string , data: any): Observable<String> {
    return this.http.post(url, data, {responseType: 'text'})
      .pipe(
        catchError(this.handleError)
      );
  }

  get<T>(url: string): Observable<T> {
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getText(url: string): Observable<String> {
    return this.http.get(url, {responseType: 'text'})
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(e: any): Promise<any> {
    console.log('An error Occurred: ' + e);
    return Promise.reject(e.message || e);
  }
}

