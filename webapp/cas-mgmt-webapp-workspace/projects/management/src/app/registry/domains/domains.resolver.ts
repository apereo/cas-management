import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {DomainService} from './domain.service';
import {DomainRpc} from 'domain-lib';

@Injectable({
  providedIn: 'root'
})
export class DomainsResolver implements Resolve<DomainRpc[]> {

  constructor(private service: DomainService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DomainRpc[]>  {
    return this.service.getDomains();
  }

}
