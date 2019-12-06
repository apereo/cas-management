/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {SamlRegisteredService, RegisteredService} from 'domain-lib';
import {Observable} from 'rxjs/internal/Observable';
import {Service} from '../service';

@Injectable({
  providedIn: 'root'
})
export class AddspServiceService extends Service {

  uploaded: RegisteredService;

  controller = 'api/services';

  upload(xml: string): Observable<SamlRegisteredService> {
    return this.post<SamlRegisteredService>('api/saml/upload', xml, 'Uploading Metadata');
  }

  lookupEntity(query: string): Observable<string[]> {
    return this.get<string[]>('api/saml/search?query=' + query, 'Looking up metadata');
  }

  addEntity(id: string): Observable<SamlRegisteredService> {
    return this.get<SamlRegisteredService>('api/saml/add?id=' + id, 'Adding SP');
  }


}
