/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Service, ServiceItem} from 'mgmt-lib';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService extends Service {

  controller = "api/submissions";

  getSubmissions(): Observable<ServiceItem[]> {
    return this.get<ServiceItem[]>(this.controller);
  }

  getYaml(id: string): Observable<string> {
    return this.postText(this.controller + '/yaml', id);
  }

  getJson(id: string): Observable<string> {
    return this.postText(this.controller + '/json', id);
  }

  reject(id: string, note: string): Observable<void> {
    return this.post(this.controller +'/reject', {id: id, note: note});
  }

  diff(id: string): Observable<string> {
    return this.postText(this.controller + '/diff', id);
  }

  accept(id: string): Observable<void> {
    return this.post(this.controller + '/accept', id);
  }

  added(id: string): Observable<void> {
    return this.post(this.controller + '/added', id);
  }

  deleteSubmission(id: string): Observable<void> {
    return this.post(this.controller + '/delete', id);
  }
}
