/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {ServiceItem, Service} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';
import {OAuthRegisteredService, OidcRegisteredService} from '../../../../../mgmt-lib/src/lib/domain/oauth-service';
import {SamlRegisteredService} from '../../../../../mgmt-lib/src/lib/domain/saml-service';
import {RegisteredService} from '../../../../../mgmt-lib/src/lib/domain/registered-service';

@Injectable({
  providedIn: 'root'
})
export class ServiceViewService extends Service {

  uploaded: RegisteredService;

  controller = 'api/services';

  getServices(domain: string): Observable<ServiceItem[]> {
    return this.get<ServiceItem[]>(this.controller + '?domain=' + domain);
  }

  getYaml(id: number): Observable<string> {
    return this.getText(this.controller + '/yaml/' + id);
  }

  getJson(id: number): Observable<string> {
    return this.getText(this.controller + '/json/' + id);
  }

  deleteService(id: number): Observable<void> {
    return this.delete(this.controller + '/' + id);
  }

  saveJson(id: number, json: string): Observable<void> {
    return this.post(this.controller + '/json/' + id, json);
  }

  saveYaml(id: number, yaml: string): Observable<void> {
    return this.post(this.controller + '/yaml/' + id,  yaml);
  }

  promote(id: number): Observable<void> {
    return this.get(this.controller + '/promote/' + id);
  }

  demote(id: number): Observable<void> {
    return this.get(this.controller + '/demote/' + id);
  }

  revert(fileName: string): Observable<string> {
    return this.getText('api/history/revert/' + fileName);
  }

  updateOrder(a: ServiceItem, b: ServiceItem): Observable<string> {
    return this.postText(this.controller + '/updateOrder', [a, b]);
  }

  createOAuthService(): Observable<OAuthRegisteredService> {
    return this.get<OAuthRegisteredService>('api/oauth/generate');
  }

  createOidcService(): Observable<OidcRegisteredService> {
    return this.get<OidcRegisteredService>('api/oidc/generate');
  }

  upload(xml: string): Observable<SamlRegisteredService> {
    return this.post<SamlRegisteredService>('api/saml/upload', xml);
  }

  lookupEntity(query: string): Observable<string[]> {
    return this.get<string[]>('api/saml/search?query=' + query);
  }

  addEntity(id: string): Observable<SamlRegisteredService> {
    return this.get<SamlRegisteredService>('api/saml/add?id=' + id);
  }


}
