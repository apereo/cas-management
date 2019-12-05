/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ServiceViewService} from '../services/service.service';
import {Observable} from 'rxjs/internal/Observable';
import {ChangesService} from '../../version-control/changes/changes.service';

@Injectable({
  providedIn: 'root'
})
export class YamlResolver implements Resolve<string> {

  constructor(private service: ServiceViewService,
              private changeService: ChangesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<string> | string {
    const history: boolean = route.data.history;
    const param: string = route.params.id;

    if (!param) {
      return '';
    } else {
      if (history) {
        return this.changeService.viewYaml(param);
      } else {
        return this.service.getYaml(+param);
      }
    }
  }
}
