import {Service} from 'shared-lib';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Server} from '../domain/dashboard';
import {Cache} from '../domain/cache';
import {AuditLog} from '../domain/audit';

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

  getResolve(uid: string): Observable<Map<string, string[]>> {
    return this.get<Map<string, string[]>>('api/dashboard/resolve/' + uid);
  }

  getRelease(data: any): Observable<Map<string, string[]>> {
    return this.post<Map<string, string[]>>('api/dashboard/release', data);
  }

  getInfo(): Observable<Map<string, string>> {
    return this.get<Map<string,string>>('api/dashboard/info');
  }

  getAudit(data: any): Observable<AuditLog[]> {
    return this.post<AuditLog[]>('api/dashboard/audit', data);
  }
}
