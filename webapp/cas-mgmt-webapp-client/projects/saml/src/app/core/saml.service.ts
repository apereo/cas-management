import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {
  Service,
  ServiceItem,
  SamlRegisteredService
} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class SamlService extends Service {

  controller = 'api/saml';

  uploaded: SamlRegisteredService;

  getServices(): Observable<ServiceItem[]> {
    return this.get<ServiceItem[]>(this.controller);
  }

  getService(id: number): Observable<SamlRegisteredService> {
    return this.get<SamlRegisteredService>('api/services/' + id);
  }

  submitService(service: SamlRegisteredService): Observable<string> {
    return this.post(this.controller, service);
  }

  saveService(service: SamlRegisteredService, id: string): Observable<void> {
    return this.patch(this.controller, {left: id, right: service});
  }

  remove(id: string): Observable<void> {
    return this.delete(this.controller + '/' + id);
  }

  upload(xml: string): Observable<SamlRegisteredService> {
    return this.post<SamlRegisteredService>(this.controller + '/upload', xml);
  }

  lookupEntity(query: string): Observable<string[]> {
    return this.get<string[]>(this.controller + "/search?query=" + query);
  }

  addEntity(id: string): Observable<SamlRegisteredService> {
    return this.get<SamlRegisteredService>(this.controller + "/add?id=" + id);
  }

  /*
  pending(id: string): Observable<AbstractRegisteredService> {
    return this.post('api/submissions/import', id);
  }


  getSubmissions(): Observable<PendingItem[]> {
    return this.get<PendingItem[]>('api/submissions/pending');
  }

  deletePending(id: string): Observable<void> {
    return this.delete('api/register/cancel?id=' + id);
  }
  */
}
