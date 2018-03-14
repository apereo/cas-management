/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {ChangesService} from '../changes/changes.service';
import {AbstractRegisteredService} from '../../domain/registered-service';
import {ServiceViewService} from '../services/service.service';
import {SubmissionsService} from '../submissions/submissions.service';

@Injectable()
export class JSONResolver implements Resolve<String> {

  constructor(private service: ServiceViewService,
              private changeService: ChangesService,
              private submissionService: SubmissionsService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Promise<String> {
    const history: boolean = route.data.history;
    const param: string = route.params['id'];

    if (!param) {
      return new Promise((resolve, reject) => resolve(null));
    } else {
      if (history) {
        return this.changeService.viewJson(param).then(resp => resp ? resp : null);
      } else if (param.endsWith(".json")) {
        return this.submissionService.getJson(param).then(resp => resp ? resp : null);
      } else {
        return this.service.getJson(+param).then(resp => resp ? resp : null);
      }
    }
  }
}
