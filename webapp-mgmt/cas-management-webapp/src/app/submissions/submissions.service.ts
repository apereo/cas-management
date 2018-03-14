/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {ServiceItem} from '../../domain/service-item';
import {Service} from '../service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SubmissionsService extends Service {

  constructor(http: HttpClient) {
    super(http);
  }

  getSubmissions(): Promise<ServiceItem[]> {
    return this.get<ServiceItem[]>('getSubmissions');
  }

  getYaml(id: String): Promise<String> {
    return this.getText('getYamlSubmission?id=' + id);
  }

  getJson(id: String): Promise<String> {
    return this.getText('getJsonSubmission?id=' + id);
  }

  delete(id: String): Promise<String> {
    return this.getText('deleteSubmission?id=' + id);
  }

}
