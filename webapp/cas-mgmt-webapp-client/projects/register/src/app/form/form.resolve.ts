import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {finalize} from 'rxjs/operators';
import {AbstractRegisteredService, RegexRegisteredService, SpinnerService} from 'mgmt-lib';
import {RegisterService} from '../core/register.servivce';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormResolve implements Resolve<AbstractRegisteredService> {

  constructor(private service: RegisterService, private spinner: SpinnerService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AbstractRegisteredService> | AbstractRegisteredService {
    if (route.url.toString().indexOf('wizard') > -1) {
      return new RegexRegisteredService();
    }
    this.spinner.start('Loading service');
    const param: string = route.params['id'];
    if (param.indexOf('json') > -1) {
      return this.service.pending(param).pipe(finalize(() => this.spinner.stop()));
    } else {
      return this.service.getService(+param).pipe(finalize(() => this.spinner.stop()));
    }
  }
}
