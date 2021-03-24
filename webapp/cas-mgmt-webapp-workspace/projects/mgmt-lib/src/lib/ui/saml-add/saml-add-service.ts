import {Injectable} from '@angular/core';
import {Service} from '../service';
import {RegisteredService, SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {Observable} from 'rxjs';

/**
 * Service that handles requests to the server for adding SAML metadata.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class SamlAddService extends Service {

  uploaded: RegisteredService;

  /**
   * Calls server with the passed xml string to be validated and returns created service.
   *
   * @param xml - metadata xml as string
   */
  upload(xml: string): Observable<SamlRegisteredService> {
    return this.post<SamlRegisteredService>('api/saml/upload', xml, 'Uploading Metadata');
  }

  /**
   * Calls server with the passed string to lookup matchig entity ids.
   *
   * @param query - partial string to match
   */
  lookupEntity(query: string): Observable<string[]> {
    return this.get<string[]>('api/saml/search?query=' + query, 'Looking up metadata');
  }

  /**
   * Calls server with the passed entity id returns created service.
   *
   * @param xml - metadata xml as string
   */
  addEntity(id: string): Observable<SamlRegisteredService> {
    return this.get<SamlRegisteredService>('api/saml/add?id=' + id, 'Adding SP');
  }

  /**
   * Calls the server with passed url to download the metadata and return a created service.
   *
   * @param url - url to metadata
   */
  downloadEntity(url: string): Observable<SamlRegisteredService> {
    return this.get<SamlRegisteredService>('api/saml/download?url=' + url, 'Downloading SP');
  }

}
