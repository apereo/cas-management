import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Branch, SpinnerService} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';
import {PullService} from './pull.service';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PullResolver implements Resolve<Branch[]> {

  constructor(private service: PullService, private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Branch[]> {
    this.spinner.start('Loading pull requests');
    return this.service.getBranches([true, false, false])
      .pipe(finalize(() => this.spinner.stop()));
  }
}

