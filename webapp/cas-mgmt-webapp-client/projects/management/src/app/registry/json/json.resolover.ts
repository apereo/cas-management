/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ChangesService} from '@app/version-control/changes/changes.service';
import {ServiceViewService} from '../services/service.service';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {SpinnerService} from 'shared-lib';

@Injectable({
  providedIn: 'root'
})
export class JSONResolver implements Resolve<string> {

  constructor(private service: ServiceViewService,
              private changeService: ChangesService,
              private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<string> | string {
    const history: boolean = route.data.history;
    const param: string = route.params['id'];

    if (!param) {
      return '';
    } else {
      if (history) {
        return this.changeService.viewJson(param);
      } else {
        return this.service.getJson(+param);
      }
    }
  }
}
