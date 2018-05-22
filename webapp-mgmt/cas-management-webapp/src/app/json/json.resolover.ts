/**
 * Created by tschmidt on 2/13/17.
 */

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {ChangesService} from '../changes/changes.service';
import {ServiceViewService} from '../services/service.service';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class JSONResolver implements Resolve<String> {

  constructor(private service: ServiceViewService,
              private changeService: ChangesService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<String> {
    const history: boolean = route.data.history;
    const param: string = route.params['id'];

    if (!param) {
      return Observable.create((observer) => observer.next(null))
        .pipe(
          take(1),
          map(data => data)
        );
    } else {
      if (history) {
        return this.changeService.viewJson(param)
          .pipe(
            take(1),
            map(resp => resp ? resp : null)
      );
      } else {
        return this.service.getJson(+param)
          .pipe(
            take(1),
            map(resp => resp ? resp : null)
          );
      }
    }
  }
}
