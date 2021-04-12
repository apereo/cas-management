import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {PendingItem} from '../domain/pending-item.model';
import {
  ServiceItem,
  AbstractRegisteredService,
  LookupItem,
  DefaultRegisteredServiceContact, SamlRegisteredService, Metadata,
  Service
} from '@apereo/mgmt-lib';

/**
 * Service to handle requests to the server for user submissions.
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterService extends Service {

  controller = 'api/register';

  /**
   * Calls server to return all services a user is a contact for in the registry.
   */
  getServices(): Observable<ServiceItem[]> {
    return this.get<ServiceItem[]>(this.controller, 'Loading Services');
  }

  /**
   * Calls the server to return the service for the passed id.
   *
   * @param id - assigned id of the service
   */
  getService(id: number): Observable<AbstractRegisteredService> {
    return this.get<AbstractRegisteredService>(this.controller + '/' + id);
  }

  /**
   * Submits the new service to be accepted by admins.
   *
   * @param service - AbstractRegisteredService
   */
  submitService(service: AbstractRegisteredService): Observable<string> {
    return this.post(this.controller, service, 'Submitting Service');
  }

  /**
   * Submits the changes to a services to be accepted by admins.
   *
   * @param service - AbstractRegisteredService
   * @param id - id of a current submission
   */
  saveService(service: AbstractRegisteredService, id: string): Observable<void> {
    return this.patch(this.controller, {left: id, right: service}, 'Saving service');
  }

  /**
   * Submits a request to admins to remove service from registry.
   *
   * @param id - assigned id of the service
   */
  remove(id: string): Observable<void> {
    return this.delete(this.controller + '/' + id);
  }

  /**
   * Returns the pending submission for the passed submission id.
   *
   * @param id - Submission id
   */
  pending(id: string): Observable<AbstractRegisteredService> {
    return this.post('api/submissions/import', id);
  }

  /**
   * Looks up all services for a domain.
   *
   * @param domain - domain name
   */
  lookUp(domain: string): Observable<LookupItem[]> {
    return this.get<LookupItem[]>(this.controller + '/lookup?domain=' + domain);
  }

  /**
   * Looks up services that have contacts that match the query lookup.
   *
   * @param contact - query string for contact
   */
  lookUpByContact(contact: string): Observable<LookupItem[]> {
    return this.get<LookupItem[]>(this.controller + '/lookupContact?query=' + contact);
  }

  /**
   * Claims a service by adding the user as a contact for the service.
   *
   * @param id - assigned id
   */
  claim(id: string): Observable<void> {
    return this.get(this.controller + '/claim/' + id);
  }

  /**
   * Unclaims a service by removing the user from a service.
   *
   * @param id - assigned id
   */
  unclaim(id: string): Observable<void> {
    return this.get(this.controller + '/unclaim/' + id);
  }

  /**
   * Unclaims all services passed in one call.
   *
   * @param svcs - list of assigned ids
   */
  bulkUnclaim(svcs: string[]): Observable<void> {
    return this.post('api/bulk/unclaim', svcs);
  }

  /**
   * Claims all services passed in one call.
   *
   * @param svcs - list of assigned ids
   */
  bulkClaim(svcs: string[]): Observable<void> {
    return this.post('api/bulk/claim', svcs);
  }

  /**
   * Removes the passed contact from all the passed services.
   *
   * @param svcs - list of assigned ids
   * @param contact - contact to remove
   */
  bulkRemove(svcs: string[], contact: DefaultRegisteredServiceContact): Observable<void> {
    return this.post('api/bulk/remove', {services : svcs, contact});
  }

  /**
   * Adds the passed contact to all the passed services.
   *
   * @param svcs - list of assigned ids
   * @param contacts - contact to add
   */
  bulkAdd(svcs: string[], contacts: DefaultRegisteredServiceContact[]): Observable<void> {
    return this.post('api/bulk/add', { services : svcs, contacts});
  }

  /**
   * Calls the server to get a list of all pending submissions for the user.
   */
  getSubmissions(): Observable<PendingItem[]> {
    return this.get<PendingItem[]>('api/submissions/pending');
  }

  /**
   * Deletes the pending submission by id.
   *
   * @param id - submission id
   */
  deletePending(id: string): Observable<void> {
    return this.delete('api/register/cancel?id=' + id);
  }

  /**
   * Submits a request to have a service promoted.
   *
   * @param id - assigned id
   */
  promote(id: number): Observable<void> {
    return this.get('api/register/promote/' + id);
  }

  /**
   * Uploads an SP metadata and returns the generated SamlRegisterredService.
   *
   * @param xml - metadata xml
   */
  upload(xml: string): Observable<SamlRegisteredService> {
    return this.post<SamlRegisteredService>('api/saml/upload', xml, 'Uploading Metadata');
  }

  /**
   * Gets the metadata for the passed service id.
   *
   * @param id - assigned id
   */
  getMetadata(id: string): Observable<Metadata> {
    return this.get('api/saml/metadata/' + id, 'Loading Metadata');
  }
}
