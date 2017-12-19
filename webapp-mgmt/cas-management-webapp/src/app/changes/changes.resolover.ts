/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {DiffEntry} from '../../domain/diff-entry';
import {ChangesService} from './changes.service';

@Injectable()
export class ChangesResolve implements Resolve<DiffEntry[]> {

  constructor(private service: ChangesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Promise<DiffEntry[]> {
    const param: String = route.params['branch'];

    if (!param) {
      return new Promise((resolve, reject) => resolve([]));
    } else {
      return this.service.getChanges(param).then(resp => {
        if (resp) {
          return resp;
        } else {
          return null;
        }
      });
    }
  }
}
