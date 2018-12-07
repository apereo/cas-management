import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Branch} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';
import {PullService} from './pull.service';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PullResolver implements Resolve<Branch[]> {

  constructor(private service: PullService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Branch[]> {
    return this.service.getBranches([true, false, false]).pipe(take(1));
  }
}

