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

@Injectable()
export class FormService {

  constructor(private http: HttpClient) {}

  getService(id: string): Observable<AbstractRegisteredService> {
    return this.http.get<AbstractRegisteredService>('getService?id=' + id)
      .pipe(
        take(1),
        map(resp => {
          const as: AbstractRegisteredService = resp as AbstractRegisteredService;
          return as;
        }),
        catchError(this.handleError)
      );
  }

  saveService(service: AbstractRegisteredService): Observable<number> {
    return this.http.post('saveService', service)
      .pipe(
        catchError(this.handleError)
      );
  }

  formData(): Observable<FormData> {
    return this.http.get<FormData>('formData')
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(e: HttpErrorResponse): Observable<any> {
    console.log('An error occurred : ' + e.message);
    return throwError(e.message);
  }

}
