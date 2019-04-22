import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {
  Service,
  ServiceItem,
  OidcRegisteredService
} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class OidcService extends Service {

  controller = 'api/oidc';

  getServices(): Observable<ServiceItem[]> {
    return this.get<ServiceItem[]>(this.controller);
  }

  getService(id: number): Observable<OidcRegisteredService> {
    return this.get<OidcRegisteredService>('api/services/' + id);
  }

  submitService(service: OidcRegisteredService): Observable<string> {
    return this.post(this.controller, service);
  }

  saveService(service: OidcRegisteredService, id: string): Observable<void> {
    return this.patch(this.controller, {left: id, right: service});
  }

  remove(id: string): Observable<void> {
    return this.delete(this.controller + '/' + id);
  }

  getNewService(): Observable<OidcRegisteredService> {
    return this.get<OidcRegisteredService>(this.controller + '/generate');
  }

  generateId(): Observable<string> {
    return this.getText(this.controller + '/generateId');
  }

  generateSecret(): Observable<string> {
    return this.getText(this.controller + '/generateSecret');
  }

  promote(id: number): Observable<void> {
    return this.get(this.controller + '/promote/' + id);
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
