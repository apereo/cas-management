import {Injectable} from '@angular/core';
import {AbstractRegisteredService} from '../../domain/registered-service';
import {catchError, map, take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {Service} from '../service';

@Injectable()
export class ImportService extends Service {

  service: AbstractRegisteredService;

  import(file: String): Observable<AbstractRegisteredService> {
    return this.http.post<AbstractRegisteredService>('import', file)
      .pipe(
        tap(resp => this.service = resp),
        catchError((e) => this.handleError(e, this.dialog))
      );
  }

}
