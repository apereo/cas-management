/**
 * Created by tschmidt on 2/14/17.
 */
import {Injectable} from '@angular/core';
import {AbstractRegisteredService} from '../../domain/registered-service';
import {FormData} from '../../domain/form-data';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, take} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {Observable} from 'rxjs/internal/Observable';
import {MatDialog} from '@angular/material';
import {TimeoutComponent} from '../timeout/timeout.component';

@Injectable()
export class FormService {

  constructor(private http: HttpClient,
              private dialog: MatDialog) {}

  getService(id: string): Observable<AbstractRegisteredService> {
    return this.http.get<AbstractRegisteredService>('getService?id=' + id)
      .pipe(
        take(1),
        map(resp => {
          const as: AbstractRegisteredService = resp as AbstractRegisteredService;
          return as;
        }),
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  saveService(service: AbstractRegisteredService): Observable<number> {
    return this.http.post('saveService', service)
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  formData(): Observable<FormData> {
    return this.http.get<FormData>('formData')
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  handleError(e: HttpErrorResponse, dialog: MatDialog): Observable<any> {
    if (e.status === 0) {
      dialog.open(TimeoutComponent, {
        width: '500px',
        position: {top: '100px'}
      })
    } else {
      console.log('An error Occurred: ' + e.message);
      return throwError(e);
    }
  }

}
