/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {ServiceItem, Service} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServiceViewService extends Service {

  controller = 'api/services';

  getServices(domain: String): Observable<ServiceItem[]> {
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

  revert(fileName: string): Observable<string> {
    return this.getText('api/history/revert/' + fileName);
  }

  updateOrder(a: ServiceItem, b: ServiceItem): Observable<string> {
    return this.postText(this.controller + '/updateOrder', [a, b]);
  }
}
