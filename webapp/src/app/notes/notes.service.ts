/**
 * Created by tsschmi on 3/8/17.
 */
import {Injectable} from '@angular/core'
import {Note} from '../../domain/note';
import {Service} from '../service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class NotesService extends Service {

  controller = 'delegated/';

  getNotes(id: String): Observable<String> {
    return this.getText(this.controller + 'notes?id=' + id);
  }

  addNote(id: String, text: String): Observable<String> {
    return this.postText(this.controller + 'addNote', new Note(id, text));
  }

}
