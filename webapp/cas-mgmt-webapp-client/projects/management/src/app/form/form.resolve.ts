/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {FormService} from './form.service';
import {AbstractRegisteredService, RegexRegisteredService} from 'domain-lib';
import {ChangesService} from '../version-control/changes/changes.service';
import {Observable} from 'rxjs/internal/Observable';
import {ImportService} from '../registry/import/import.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormResolve implements Resolve<AbstractRegisteredService[]> {

  constructor(private service: FormService,
              private changeService: ChangesService,
              private importService: ImportService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<AbstractRegisteredService[]> | AbstractRegisteredService[] {
    const param: string = route.params['id'];

    if (route.data.view) {
      return this.changeService.getChangePair(param)
    } else if (route.data.import) {
      return [this.importService.service];
    } else if (!param || param === '-1') {
      return [new RegexRegisteredService()];
    }
      return this.service.getService(param)
        .pipe(
          map(resp => {
            if (resp) {
              if (route.data.duplicate) {
                resp.id = -1;
                resp.evaluationOrder = -1;
              }
              return [resp];
            } else {
              return [];
            }
          }),
        );
  }
}
