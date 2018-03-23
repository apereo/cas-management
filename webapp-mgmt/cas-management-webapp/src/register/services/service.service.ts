/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {ServiceItem} from '../../domain/service-item';
import {Service} from '../../app/service';
import {HttpClient} from '@angular/common/http';
import {AbstractRegisteredService} from '../../domain/registered-service';

@Injectable()
export class ServiceViewService extends Service {

  constructor(http: HttpClient) {
    super(http);
  }

  getServices(): Promise<ServiceItem[]> {
    return this.get<ServiceItem[]>('getRegisterServices');
  }

  getYaml(id: number): Promise<String> {
    return this.getText('getYaml?id=' + id);
  }

  getJson(id: number): Promise<String> {
    return this.getText('getJson?id=' + id);
  }

  getService(id: number): Promise<AbstractRegisteredService> {
    return this.get<AbstractRegisteredService>('getRegisterService?id=' + id);
  }

  renew(id: string): Promise<String> {
    return this.getText("renew?id=" + id);
  }

}
