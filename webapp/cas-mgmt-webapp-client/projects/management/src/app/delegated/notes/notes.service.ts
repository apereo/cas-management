/**
 * Created by tsschmi on 3/8/17.
 */
import {Injectable} from '@angular/core';
import {Note, Service} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends Service {

  controller = 'api/note';

  getNotes(id: string): Observable<string> {
    return this.getText(this.controller + '/' + id);
  }

  addNote(id: string, text: string): Observable<string> {
    return this.postText(this.controller, new Note(id, text));
  }

}
