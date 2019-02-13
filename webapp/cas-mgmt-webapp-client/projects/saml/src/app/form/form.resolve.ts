import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {finalize} from 'rxjs/operators';
import {SpinnerService, SamlRegisteredService, LdapSamlRegisteredServiceAttributeReleasePolicy} from 'mgmt-lib';
import {SamlService} from '../core/saml.service';

@Injectable({
  providedIn: 'root'
})
export class SamlFormResolve implements Resolve<SamlRegisteredService> {

  constructor(private service: SamlService, private spinner: SpinnerService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SamlRegisteredService> | SamlRegisteredService {
    const param: number = +route.params['id'];
    if (param < 0) {
      const srv = new SamlRegisteredService();
      srv.attributeReleasePolicy = new LdapSamlRegisteredServiceAttributeReleasePolicy();
      return srv;
    }
    if (param === 0) {
      return this.service.uploaded;
    }
    this.spinner.start('Loading service');
    return this.service.getService(param).pipe(finalize(() => this.spinner.stop()));
  }
}
