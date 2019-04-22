import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {
  AbstractRegisteredService,
  Service,
  ServiceItem,
  LookupItem,
  DefaultRegisteredServiceContact,
  PendingItem
} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends Service {

  controller = 'api/register';

  getServices(): Observable<ServiceItem[]> {
    return this.get<ServiceItem[]>(this.controller);
  }

  getService(id: number): Observable<AbstractRegisteredService> {
    return this.get<AbstractRegisteredService>('api/services/' + id);
  }

  submitService(service: AbstractRegisteredService): Observable<string> {
    return this.post(this.controller, service);
  }

  saveService(service: AbstractRegisteredService, id: string): Observable<void> {
    return this.patch(this.controller, {left: id, right: service});
  }

  remove(id: string): Observable<void> {
    return this.delete(this.controller + '/' + id);
  }

  pending(id: string): Observable<AbstractRegisteredService> {
    return this.post('api/submissions/import', id);
  }

  lookUp(domain: string): Observable<LookupItem[]> {
    return this.get<LookupItem[]>(this.controller + '/lookup?domain=' + domain);
  }

  lookUpByContact(contact: string): Observable<LookupItem[]> {
    return this.get<LookupItem[]>(this.controller + '/lookupContact?query=' + contact);
  }

  claim(id: string): Observable<void> {
    return this.get(this.controller + '/claim/' + id);
  }

  unclaim(id: string): Observable<void> {
    return this.get(this.controller + '/unclaim/' + id);
  }

  bulkUnclaim(svcs: string[]): Observable<void> {
    return this.post('api/bulk/unclaim', svcs);
  }

  bulkClaim(svcs: string[]): Observable<void> {
    return this.post('api/bulk/claim', svcs);
  }

  bulkRemove(svcs: string[], contact: DefaultRegisteredServiceContact): Observable<void> {
    return this.post('api/bulk/remove', {'services' : svcs, 'contact' : contact});
  }

  bulkAdd(svcs: string[], contacts: DefaultRegisteredServiceContact[]): Observable<void> {
    return this.post('api/bulk/add', { 'services' : svcs, 'contacts' : contacts});
  }

  getSubmissions(): Observable<PendingItem[]> {
    return this.get<PendingItem[]>('api/submissions/pending/cas');
  }

  deletePending(id: string): Observable<void> {
    return this.delete('api/register/cancel?id=' + id);
  }

  promote(id: number): Observable<void> {
    return this.get('api/register/promote/' + id);
  }
}
