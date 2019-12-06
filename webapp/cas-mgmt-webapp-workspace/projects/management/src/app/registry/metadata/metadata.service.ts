/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {Service} from 'shared-lib';
import {Observable} from 'rxjs/internal/Observable';
import {Metadata} from 'domain-lib';

@Injectable({
  providedIn: 'root'
})
export class MetadataService extends Service {

  controller = 'api/saml/metadata';

  getMetadata(id: string): Observable<Metadata> {
    return this.get('api/saml/metadata/' + id, 'Loading Metadata');
  }

  saveMetadata(id: string, metadata: string): Observable<void> {
    return this.post<void>('api/saml/metadata/' + id, metadata, 'Saving Metadata');
  }
}
