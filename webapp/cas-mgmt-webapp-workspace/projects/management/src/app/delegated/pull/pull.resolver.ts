import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Branch} from 'domain-lib';
import {Observable} from 'rxjs/internal/Observable';
import {PullService} from './pull.service';

@Injectable({
  providedIn: 'root'
})
export class PullResolver implements Resolve<Branch[]> {

  constructor(private service: PullService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Branch[]> {
    return this.service.getBranches([true, false, false], "Loading pull requests");
  }
}

