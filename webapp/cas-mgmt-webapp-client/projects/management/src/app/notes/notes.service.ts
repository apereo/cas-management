/**
 * Created by tsschmi on 3/8/17.
 */
import {Injectable} from '@angular/core'
import {Note, Service} from 'mgmt-lib';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class NotesService extends Service {

  controller = '/api/note';

  getNotes(id: String): Observable<String> {
    return this.getText(this.controller + '/' + id);
  }

  addNote(id: String, text: String): Observable<String> {
    return this.postText(this.controller, new Note(id, text));
  }

}
