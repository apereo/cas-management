import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {AbstractRegisteredService, DiffEntry} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';
import {HttpResponse} from '@angular/common/http';

/**
 * Service to handle requests to the server for changes.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class ChangesService extends Service {

  controller = 'api/change';

  /**
   * Calls the server to get all changes in a branch.
   *
   * @param branch - branch name
   */
  getChanges(branch: string): Observable<DiffEntry[]> {
    return this.post<DiffEntry[]>(this.controller, branch);
  }

  /**
   * Calls the server to get the change as json.
   *
   * @param id - item id
   */
  viewJson(id: string): Observable<string> {
    return this.getText(this.controller + '/json/' + id);
  }

  /**
   * Calls the server to get the change as yaml.
   *
   * @param id - item id
   */
  viewYaml(id: string): Observable<string> {
    return this.getText(this.controller + '/yaml/' + id);
  }

  /**
   * Calls the server to calculate the diff of two items.
   *
   * @param oldId - old item id
   * @param newId - new item id
   */
  viewDiff(oldId: string, newId: string): Observable<string> {
    const data = [oldId, newId];
    return this.postText(this.controller + '/diff', data);
  }

  /**
   * Calls the server to get two versions of a registered service. One with change and the previous version.
   *
   * @param change - id of the change
   */
  getChangePair(change: string): Observable<AbstractRegisteredService[]> {
    return this.get<AbstractRegisteredService[]>(this.controller + '/pair/' + change);
  }

  /**
   * Calls the server get the changes as a diff from the server.
   *
   * @param commit - commit id
   * @param path - path to service in commit
   */
  change(commit: string, path: string): Observable<HttpResponse<string>> {
    return this.http.post('../' + this.controller + '/made', [path, commit], {observe: 'response', responseType: 'text'});
  }

  /**
   * Calls the server to get the diff form the server for the version against the current version.
   *
   * @param commit - commit id
   * @param path - path to service in the commit
   */
  toHead(commit: string, path: string): Observable<HttpResponse<string>> {
    return this.http.post('../' + this.controller + '/compare', [path, commit], {observe: 'response', responseType: 'text'});
  }

}
