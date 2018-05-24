/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {FormService} from './form.service';
import {AbstractRegisteredService, RegexRegisteredService} from '../../domain/registered-service';
import {ChangesService} from '../changes/changes.service';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class FormResolve implements Resolve<AbstractRegisteredService[]> {

  constructor(private service: FormService, private changeService: ChangesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<AbstractRegisteredService[]> | AbstractRegisteredService[] {
    const param: string = route.params['id'];

    if (!param || param === '-1') {
      return [new RegexRegisteredService()];
    } else if (route.data.view) {
      return this.changeService.getChangePair(param).pipe(take(1));
    } else {
      return this.service.getService(param)
        .pipe(
          take(1),
          map(resp => {
            if (resp) {
              if (route.data.duplicate) {
                resp.id = -1;
              }
              return [resp];
            } else {
              return [];
            }
          })
        );
    }
  }
}
