import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {
  Service,
  ServiceItem,
  OAuthRegisteredService,
  PendingItem
} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class OAuthService extends Service {

  controller = 'api/oauth';

  getServices(): Observable<ServiceItem[]> {
    return this.get<ServiceItem[]>(this.controller);
  }

  getService(id: number): Observable<OAuthRegisteredService> {
    return this.get<OAuthRegisteredService>('api/services/' + id);
  }

  submitService(service: OAuthRegisteredService): Observable<string> {
    return this.post(this.controller, service);
  }

  saveService(service: OAuthRegisteredService, id: string): Observable<void> {
    return this.patch(this.controller, {left: id, right: service});
  }

  remove(id: string): Observable<void> {
    return this.delete(this.controller + '/' + id);
  }

  getNewService(): Observable<OAuthRegisteredService> {
    return this.get<OAuthRegisteredService>(this.controller + '/generate');
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

  getSubmissions(): Observable<PendingItem[]> {
    return this.get<PendingItem[]>('api/submissions/pending/oauth');
  }

  pending(id: string): Observable<OAuthRegisteredService> {
    return this.post('api/submissions/import', id);
  }

  deletePending(id: string): Observable<void> {
    return this.delete('api/register/cancel?id=' + id);
  }
}
