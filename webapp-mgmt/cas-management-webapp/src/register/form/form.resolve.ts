import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AbstractRegisteredService} from '../../domain/registered-service';
import {ServiceViewService} from '../services/service.service';
import {Injectable} from '@angular/core';

@Injectable()
export class RegisterFormResolve implements Resolve<AbstractRegisteredService>{

  constructor(private service: ServiceViewService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<AbstractRegisteredService> {
    const param: string = route.params['id'];
    return this.service.getService(+param).then(resp => resp);
  }
}