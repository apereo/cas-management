/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {DiffEntry} from 'mgmt-lib';
import {ChangesService} from './changes.service';
import {Observable} from 'rxjs/internal/Observable';
import {map, take} from 'rxjs/operators';

@Injectable()
export class ChangesResolve implements Resolve<DiffEntry[]> {

  constructor(private service: ChangesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DiffEntry[]> | DiffEntry[] {
    const param: String = route.params['branch'];
    return param ? this.service.getChanges(param).pipe(take(1)) : [];
  }
}
