/**
 * Created by tsschmi on 3/8/17.
 */
import {Injectable} from '@angular/core'
import {Note} from '../../domain/note';
import {Service} from '../service';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NotesService extends Service {

  constructor(protected http: HttpClient) {
    super(http);
  }

  getNotes(id: String): Promise<String> {
    return this.getText('notes?id=' + id);
  }

  addNote(id: String, text: String): Promise<String> {
    return this.postText('addNote', new Note(id, text));
  }

}
