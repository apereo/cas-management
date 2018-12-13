/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {Service, DomainRpc} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DomainService extends Service {

  controller = 'api/domains';

  getDomains(): Observable<DomainRpc[]> {
    return this.get<DomainRpc[]>(this.controller);
  }

 }
