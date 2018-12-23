/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ChangesService} from '@app/version-control/changes/changes.service';
import {ServiceViewService} from '../services/service.service';
import {finalize, take} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {SpinnerService} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class YamlResolver implements Resolve<string> {

  constructor(private service: ServiceViewService,
              private changeService: ChangesService,
              private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<string> | string {
    const history: boolean = route.data.history;
    const param: string = route.params['id'];

    if (!param) {
      return '';
    } else {
      this.spinner.start('Loading yaml');
      if (history) {
        return this.changeService.viewYaml(param).pipe(finalize(() => this.spinner.stop()));
      } else {
        return this.service.getYaml(+param).pipe(finalize(() => this.spinner.stop()));
      }
    }
  }
}
