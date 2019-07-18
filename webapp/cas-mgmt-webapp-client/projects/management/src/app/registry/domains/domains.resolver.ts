import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {DomainService} from './domain.service';
import {finalize} from 'rxjs/operators';
import {SpinnerService, DomainRpc} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class DomainsResolver implements Resolve<DomainRpc[]> {

  constructor(private service: DomainService, private spinner: SpinnerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DomainRpc[]>  {
    this.spinner.start('Loading domains');
    return this.service.getDomains().pipe(finalize(() => this.spinner.stop()));
  }

}
