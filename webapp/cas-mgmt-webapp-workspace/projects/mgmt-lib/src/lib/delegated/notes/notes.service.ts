import {Injectable} from '@angular/core';
import {Note} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable} from 'rxjs/internal/Observable';

/**
 * Service to handle requests to the server for Notes.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class NotesService extends Service {

  controller = 'api/note';

  /**
   * Calls the server to get notes for the passed id.
   *
   * @param id - note id to retrieve
   */
  getNotes(id: string): Observable<string> {
    return this.getText(this.controller + '/' + id, 'Loading notes');
  }

  /**
   * Saves a note to the pull the request.
   *
   * @param id - note id
   * @param text - note text
   */
  addNote(id: string, text: string): Observable<string> {
    return this.postText(this.controller, new Note(id, text));
  }

}
