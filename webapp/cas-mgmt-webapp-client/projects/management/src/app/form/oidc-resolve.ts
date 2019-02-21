import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {AbstractRegisteredService, SpinnerService} from 'mgmt-lib';
import {ServiceViewService} from '@app/registry/services/service.service';

@Injectable({
  providedIn: 'root'
})
export class OidcResolve implements Resolve<AbstractRegisteredService[]> {

  constructor(private service: ServiceViewService, private spinner: SpinnerService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AbstractRegisteredService[]> | AbstractRegisteredService[] {
    this.spinner.start('Creating OIDC Service');
    return this.service.createOidcService()
      .pipe(
        map(v => [v, null]),
        finalize(() => this.spinner.stop())
      );
  }
}
