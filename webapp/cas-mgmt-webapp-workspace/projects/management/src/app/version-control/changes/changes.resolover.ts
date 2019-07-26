/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {DiffEntry} from 'domain-lib';
import {ChangesService} from './changes.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChangesResolve implements Resolve<DiffEntry[]> {

  constructor(private service: ChangesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DiffEntry[]> | DiffEntry[] {
    const param: string = route.params['branch'];
    if (param) {
      return this.service.getChanges(param);
    }
    return [];
  }
}
