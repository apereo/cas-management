import {Service} from 'shared-lib';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Server} from '../domain/dashboard';
import {Cache} from '../domain/cache';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends Service {

  getCache(): Observable<Cache> {
    return this.get<Cache>('api/dashboard/cache');
  }

  getStatus(): Observable<Server[]> {
    return this.get<Server[]>('api/dashboard');
  }

  getUpdate(index: number): Observable<Server> {
    return this.get<Server>('api/dashboard/' + index);
  }
}
