/**
 * Created by tschmidt on 2/14/17.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, take} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {AbstractRegisteredService, FormData} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  controller = 'api/services/';

  constructor(private http: HttpClient,
              private dialog: MatDialog) {}

  getService(id: string): Observable<AbstractRegisteredService> {
    return this.http.get<AbstractRegisteredService>(this.controller + id)
      .pipe(
        take(1),
        map(resp => {
          return resp as AbstractRegisteredService;
        }),
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  saveService(service: AbstractRegisteredService): Observable<number> {
    return this.http.post(this.controller, service)
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  handleError(e: HttpErrorResponse, dialog: MatDialog): Observable<any> {
    if (e.status === 0) {
      //dialog.open(UnknownComponent, {
      //  width: '500px',
      //  position: {top: '100px'}
      //})
    } else {
      console.log('An error Occurred: ' + e.message);
      return throwError(e);
    }
  }

}
