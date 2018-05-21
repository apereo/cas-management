import {Injectable} from '@angular/core';
import {AbstractRegisteredService} from '../../domain/registered-service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map, take} from 'rxjs/operators';

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

  handleError(e: any): Promise<any> {
    console.log('An error occurred : ' + e.message);
    return Promise.reject(e.message || e);
  }
}
