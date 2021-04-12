import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {ServiceItem} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Service to handle requests to the server for submissions.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class SubmissionsService extends Service {

  controller = 'api/submissions';

  /**
   * Calls the server and returns all submissions.
   */
  getSubmissions(): Observable<ServiceItem[]> {
    return this.get<ServiceItem[]>(this.controller);
  }

  /**
   * Calls the server to get the passed submission as yaml.
   *
   * @param id - submission id
   */
  getYaml(id: string): Observable<string> {
    return this.postText(this.controller + '/yaml', id);
  }

  /**
   * Calls the server to get the passed submission as json.
   *
   * @param id - submission id
   */
  getJson(id: string): Observable<string> {
    return this.postText(this.controller + '/json', id);
  }

  /**
   * Calls the server to get the metadata for the submission.
   *
   * @param id - submission id
   */
  getMetadata(id: string): Observable<string> {
    return this.postText(this.controller + '/metadata', id);
  }

  /**
   * Calls the server to reject the passed submission.
   *
   * @param id - submission id
   * @param note - rejection note
   */
  reject(id: string, note: string): Observable<void> {
    return this.post(this.controller + '/reject', {id, note});
  }

  /**
   * Calls the server to get a diff od the submission and the current service in the registry.
   *
   * @param id - submission id
   */
  diff(id: string): Observable<string> {
    return this.postText(this.controller + '/diff', id);
  }

  /**
   * Calls the server to accept the submission into the registry.
   *
   * @param id - submission id
   */
  accept(id: string): Observable<void> {
    return this.post(this.controller + '/accept', id);
  }

  /**
   * Calls the server to generate an email that the submission has been added to the registry.
   *
   * @param id - submission id
   */
  added(id: string): Observable<void> {
    return this.post(this.controller + '/added', id);
  }

  /**
   * Deletes the submission from the server.
   *
   * @param id - submission id
   */
  deleteSubmission(id: string): Observable<void> {
    return this.delete(this.controller + '?id=' + id);
  }
}
