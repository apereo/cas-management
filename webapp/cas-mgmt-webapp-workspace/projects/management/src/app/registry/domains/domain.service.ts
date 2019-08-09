/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {Service} from 'shared-lib';
import {DomainRpc} from 'domain-lib';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DomainService extends Service {

  controller = 'api/domains';

  getDomains(): Observable<DomainRpc[]> {
    return this.get<DomainRpc[]>(this.controller, 'Loading domains');
  }

 }
