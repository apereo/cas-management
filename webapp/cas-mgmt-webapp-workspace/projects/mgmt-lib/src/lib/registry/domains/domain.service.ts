import {Injectable} from '@angular/core';
import {DomainRpc} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable} from 'rxjs/internal/Observable';

/**
 * Service to handle requests to the server for domains.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class DomainService extends Service {

  controller = 'api/domains';

  /**
   * Calls the server and retrieves a list of all domains registered in the repository.
   */
  getDomains(): Observable<DomainRpc[]> {
    return this.get<DomainRpc[]>(this.controller, 'Loading domains');
  }

 }
