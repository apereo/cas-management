/**
 * Created by tsschmi on 3/8/17.
 */
import {Injectable} from '@angular/core';
import {Note} from 'domain-lib';
import {Service} from 'shared-lib';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends Service {

  controller = 'api/note';

  getNotes(id: string): Observable<string> {
    return this.getText(this.controller + '/' + id, 'Loading notes');
  }

  addNote(id: string, text: string): Observable<string> {
    return this.postText(this.controller, new Note(id, text));
  }

}
