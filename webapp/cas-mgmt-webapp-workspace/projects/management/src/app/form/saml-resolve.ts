import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AbstractRegisteredService, SamlRegisteredService} from 'domain-lib';
import {SamlAddService} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class SamlResolve implements Resolve<AbstractRegisteredService[]> {

  constructor(private service: SamlAddService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AbstractRegisteredService[]>
                                                                    | AbstractRegisteredService[] {
    return [new SamlRegisteredService(this.service.uploaded), null];
  }
}
