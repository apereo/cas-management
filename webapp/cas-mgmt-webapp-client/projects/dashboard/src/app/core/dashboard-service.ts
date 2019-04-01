import {Service} from 'mgmt-lib';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Server, Status} from '../domain/status';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends Service {

  constructor(protected http: HttpClient, protected dialog: MatDialog) {
    super(http, dialog);
  }

  getStatus(): Observable<Server[]> {
    return this.get<Server[]>('api/dashboard');
  }

  getUpdate(index: number): Observable<Server> {
    return this.get<Server>('api/dashboard/' + index);
  }
}
