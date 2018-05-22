/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {DiffEntry} from '../../domain/diff-entry';
import {ChangesService} from './changes.service';
import {Observable} from 'rxjs/internal/Observable';
import {map, take} from 'rxjs/operators';

@Injectable()
export class ChangesResolve implements Resolve<DiffEntry[]> {

  constructor(private service: ChangesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DiffEntry[]> {
    const param: String = route.params['branch'];

    if (!param) {
      return Observable.create((observer) => observer.next([]))
        .pipe(
          take(1),
          map(data => data)
        );
    } else {
      this.service.getChanges(param).pipe(
        take(1),
        map(resp => {
          if (resp) {
            return resp;
          } else {
            return null;
          }
        })
      );
    }
  }
}
