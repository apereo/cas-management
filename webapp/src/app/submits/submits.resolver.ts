import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Branch} from '../../domain/branch';
import {SubmitService} from './submits.service';
import {Observable} from 'rxjs/internal/Observable';
import {take} from 'rxjs/operators';

@Injectable()
export class SubmitsResolver implements Resolve<Branch[]> {

  constructor(private service: SubmitService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Branch[]> {
    return this.service.getSubmits().pipe(take(1));
  }
}
