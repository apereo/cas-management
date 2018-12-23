/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {History, Service} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService extends Service {

  controller = 'api/history';

  history(fileName: string): Observable<History[]> {
    return this.post<History[]>(this.controller, fileName);
  }

  checkout(id: string, path: string): Observable<string> {
    return this.postText(this.controller + 'checkout', {path, id});
  }

  change(commit: string, path: string): Observable<HttpResponse<string>> {
    return this.http.post('api/change/made', [path, commit], {observe: 'response', responseType: 'text'});
  }

  toHead(commit: string, path: string): Observable<HttpResponse<string>> {
    return this.http.post('api/change/compare', [path, commit], {observe: 'response', responseType: 'text'});
  }
}
