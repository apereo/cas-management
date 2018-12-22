/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {DiffEntry, SpinnerService} from 'mgmt-lib';
import {ChangesService} from './changes.service';
import {Observable} from 'rxjs/internal/Observable';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChangesResolve implements Resolve<DiffEntry[]> {

  constructor(private service: ChangesService, private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DiffEntry[]> | DiffEntry[] {
    const param: string = route.params['branch'];
    if (param) {
      this.spinner.start('Loading changes');
      return this.service.getChanges(param).pipe(finalize(() => this.spinner.stop()));
    }
    return [];
  }
}
