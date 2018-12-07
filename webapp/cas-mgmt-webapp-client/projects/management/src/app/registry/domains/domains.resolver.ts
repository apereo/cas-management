import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {DomainService} from './domain.service';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DomainsResolver implements Resolve<String[]> {

  constructor(private service: DomainService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<String[]>  {
    return this.service.getDomains().pipe(take(1));
  }

}
