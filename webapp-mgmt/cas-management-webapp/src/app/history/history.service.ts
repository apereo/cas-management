/**
 * Created by tschmidt on 2/13/17.
 */
import {Injectable} from '@angular/core';
import {History} from '../../domain/history';
import {Service} from '../service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class HistoryService extends Service {

  history(fileName: string): Observable<History[]> {
    return this.get<History[]>('history?path=' + fileName);
  }

  checkout(id: string, path: String): Observable<String> {
    return this.getText('checkout?id=' + id + '&path=' + path);
  }

}
