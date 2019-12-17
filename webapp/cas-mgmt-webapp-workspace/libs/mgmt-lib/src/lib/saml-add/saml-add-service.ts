import {Injectable} from '@angular/core';
import {Service} from 'shared-lib';
import {RegisteredService, SamlRegisteredService} from 'domain-lib';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SamlAddService extends Service {

  uploaded: RegisteredService;

  upload(xml: string): Observable<SamlRegisteredService> {
    return this.post<SamlRegisteredService>('api/saml/upload', xml, 'Uploading Metadata');
  }

  lookupEntity(query: string): Observable<string[]> {
    return this.get<string[]>('api/saml/search?query=' + query, 'Looking up metadata');
  }

  addEntity(id: string): Observable<SamlRegisteredService> {
    return this.get<SamlRegisteredService>('api/saml/add?id=' + id, 'Adding SP');
  }

  downloadEntity(url: string): Observable<SamlRegisteredService> {
    return this.get<SamlRegisteredService>('api/saml/download?url=' + url, 'Downloading SP');
  }

}
