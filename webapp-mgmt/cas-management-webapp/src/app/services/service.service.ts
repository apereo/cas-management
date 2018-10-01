/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {ServiceItem} from '../../domain/service-item';
import {Service} from '../service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class ServiceViewService extends Service {

  getServices(domain: String): Observable<ServiceItem[]> {
    return this.get<ServiceItem[]>('getServices?domain=' + domain);
  }

  getYaml(id: number): Observable<String> {
    return this.getText('getYaml?id=' + id);
  }

  getJson(id: number): Observable<String> {
    return this.getText('getJson?id=' + id);
  }

  delete(id: number): Observable<String> {
    return this.getText('deleteRegisteredService?id=' + id);
  }

  revert(fileName: string): Observable<String> {
    return this.getText('revert?path=' + fileName);
  }

  updateOrder(a: ServiceItem, b: ServiceItem): Observable<String> {
    return this.postText('updateOrder', [a, b]);
  }
}
