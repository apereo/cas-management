/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {ServiceItem} from '../../domain/service-item';
import {Service} from '../service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ServiceViewService extends Service {

  constructor(http: HttpClient) {
    super(http);
  }

  getServices(domain: String): Promise<ServiceItem[]> {
    return this.get<ServiceItem[]>('getServices?domain=' + domain);
  }

  getYaml(id: number): Promise<String> {
    return this.getText('getYaml?id=' + id);
  }

  getJson(id: number): Promise<String> {
    return this.getText('getJson?id=' + id);
  }

  delete(id: number): Promise<String> {
    return this.getText('deleteRegisteredService?id=' + id);
  }

  revert(fileName: string): Promise<String> {
    return this.getText('revert?path=' + fileName);
  }

  revertDelete(fileName: string): Promise<String> {
    return this.getText('revertDelete?path=' + fileName);
  }

  updateOrder(a: ServiceItem, b: ServiceItem): Promise<String> {
    return this.postText('updateOrder', [a, b]);
  }

}
