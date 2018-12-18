import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Branch, SpinnerService} from 'mgmt-lib';
import {SubmitService} from './submits.service';
import {Observable} from 'rxjs/internal/Observable';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubmitsResolver implements Resolve<Branch[]> {

  constructor(private service: SubmitService, private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Branch[]> {
    this.spinner.start('Loading submits');
    return this.service.getSubmits().pipe(finalize(() => this.spinner.stop()));
  }
}
