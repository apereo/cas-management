import {Injectable} from '@angular/core';
import {ServiceItem} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable} from 'rxjs/internal/Observable';

/**
 * Service for handling request to the server for registered services.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class RegistryService extends Service {

  controller = 'api/services';

  /**
   * Calls the server to return all services in a domain.
   *
   * @param domain - domain name
   */
  getServices(domain: string): Observable<ServiceItem[]> {
    return this.get<ServiceItem[]>(this.controller + '?domain=' + domain);
  }

  /**
   * Calls the server to return the service as yaml.
   *
   * @param id - assigned service id
   */
  getYaml(id: number): Observable<string> {
    return this.getText(this.controller + '/yaml/' + id);
  }

  /**
   * Calls the server to return the service as json.
   *
   * @param id - assigned service id
   */
  getJson(id: number): Observable<string> {
    return this.getText(this.controller + '/json/' + id);
  }

  /**
   * Calls the server to delete the service from the registry.
   *
   * @param id - assigned service id
   */
  deleteService(id: number): Observable<void> {
    return this.delete(this.controller + '/' + id);
  }

  /**
   * Calls the server with a json representation of the service to be saved.
   *
   * @param id - assigned service id.
   * @param json - service as json string.
   */
  saveJson(id: number, json: string): Observable<void> {
    return this.post(this.controller + '/json/' + id, json);
  }

  /**
   * Calls the server with a yaml representation of the service to be saved.
   *
   * @param id - assigned service id.
   * @param yaml - service as yaml string.
   */
  saveYaml(id: number, yaml: string): Observable<void> {
    return this.post(this.controller + '/yaml/' + id,  yaml);
  }

  /**
   * Calls the server to promote the service to production.
   *
   * @param id - assigned service id
   */
  promote(id: number): Observable<void> {
    return this.get(this.controller + '/promote/' + id);
  }

  /**
   * Calls the server to demote the service from production.
   *
   * @param id - assigned service id
   */
  demote(id: number): Observable<void> {
    return this.get(this.controller + '/demote/' + id);
  }

  /**
   * Call the server to revert the changes made to a service.
   *
   * @param fileName - file name in repository
   */
  revert(fileName: string): Observable<string> {
    return this.getText('api/history/revert/' + fileName);
  }

  /**
   * Calls the server to update the order of the services in a domain.
   *
   * @param a - service item
   * @param b - service item
   */
  updateOrder(a: ServiceItem[]): Observable<string> {
    return this.postText(this.controller + '/updateOrder', a);
  }

}
