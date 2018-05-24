import {Injectable} from '@angular/core';
import {AbstractRegisteredService} from '../../domain/registered-service';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {Service} from '../service';

@Injectable()
export class ImportService extends Service {

  service: AbstractRegisteredService;

  import(file: String): Observable<AbstractRegisteredService> {
    return this.http.post<AbstractRegisteredService>('import', file)
      .pipe(
         take(1),
         map(resp => {
           this.service = resp;
           return resp;
         }),
      );
  }

}
