/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ChangesService} from '../../version-control/changes/changes.service';
import {ServiceViewService} from '../services/service.service';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class JSONResolver implements Resolve<String> {

  constructor(private service: ServiceViewService,
              private changeService: ChangesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<String> | String {
    const history: boolean = route.data.history;
    const param: string = route.params['id'];

    if (!param) {
      return '';
    } else {
      if (history) {
        return this.changeService.viewJson(param).pipe(take(1));
      } else {
        return this.service.getJson(+param).pipe(take(1));
      }
    }
  }
}
