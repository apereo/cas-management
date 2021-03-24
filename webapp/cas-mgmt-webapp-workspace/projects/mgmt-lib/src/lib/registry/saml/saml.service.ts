import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Metadata, ServiceItem} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Service for handling requests to the server for Saml Services.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class SamlService extends Service {

  controller = 'api/services';

  /**
   * Calls server and returns all registered Saml services in the registry.
   */
  getServices(): Observable<ServiceItem[]> {
    return this.get<ServiceItem[]>(this.controller + '/saml', 'Loading Services');
  }

  /**
   * Calls the server and returns the metada for the Saml service.
   *
   * @param id - assigned service id
   */
  getMetadata(id: string): Observable<Metadata> {
    return this.get('api/saml/metadata/' + id, 'Loading Metadata');
  }

  /**
   * Calls the server to save the metadata changes to for the service.
   *
   * @param id - assigned service id
   * @param metadata - metadata as string
   */
  saveMetadata(id: string, metadata: string): Observable<void> {
    return this.post<void>('api/saml/metadata/' + id, metadata, 'Saving Metadata');
  }
}
