/**
 * Created by tschmidt on 2/14/17.
 */
import {Injectable} from '@angular/core';
import {catchError, map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AbstractRegisteredService, Service} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class FormService extends Service {

  controller = 'api/services/';

  getService(id: string): Observable<AbstractRegisteredService> {
    return this.get<AbstractRegisteredService>(this.controller + id)
      .pipe(
        take(1),
        map(resp => {
          return resp;
        }),
        catchError(e => this.handleError(e, this.dialog))
      );
  }

  saveService(service: AbstractRegisteredService): Observable<number> {
    return this.post(this.controller, service)
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

}
