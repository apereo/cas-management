/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {ServiceItem} from '../../domain/service-item';
import {Service} from '../service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ServiceViewService extends Service {

  constructor(http: HttpClient) {
    super(http);
  }

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
