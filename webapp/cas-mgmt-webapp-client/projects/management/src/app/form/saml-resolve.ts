import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AbstractRegisteredService} from 'mgmt-lib';
import {ServiceViewService} from '@app/registry/services/service.service';

@Injectable({
  providedIn: 'root'
})
export class SamlResolve implements Resolve<AbstractRegisteredService[]> {

  constructor(private service: ServiceViewService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AbstractRegisteredService[]> | AbstractRegisteredService[] {
    return [this.service.uploaded, null];
  }
}
