import {Injectable} from '@angular/core';
import {AbstractRegisteredService} from '../../domain/registered-service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, take} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable()
export class ImportService {

  service: AbstractRegisteredService;

  constructor(private http: HttpClient) {}

  import(file: String): Observable<AbstractRegisteredService> {
    return this.http.post<AbstractRegisteredService>('import', file)
      .pipe(
         take(1),
         map(resp => {
           this.service = resp;
           return resp;
         }),
         catchError(this.handleError)
      );
  }

  handleError(e: HttpErrorResponse): Observable<any> {
    console.log('An error occurred : ' + e.message);
    return throwError(e.message);
  }
}
