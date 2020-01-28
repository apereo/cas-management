import {Service} from 'shared-lib';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Server} from '../domain/dashboard.model';
import {Cache} from '../domain/cache.model';
import {AuditLog} from '../domain/audit.model';
import {Logger} from '../domain/logger.model';

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
    return this.get<Map<string, string[]>>('api/dashboard/resolve/' + uid, 'Resolving');
  }

  getRelease(data: any): Observable<Map<string, string[]>> {
    return this.post<Map<string, string[]>>('api/dashboard/release', data, 'Authenticating');
  }

  getInfo(): Observable<Map<string, string>> {
    return this.get<Map<string, string>>('api/dashboard/info');
  }

  getAudit(data: any): Observable<AuditLog[]> {
    return this.post<AuditLog[]>('api/dashboard/audit', data, 'Searching');
  }

  downloadAudit(data: any): Observable<void> {
    return this.post<void>('api/dashboard/audit/download', data, 'Downloading');
  }

  getLoggers(): Observable<Map<string, Map<string, Logger>>> {
    return this.get<Map<string, Map<string, Logger>>>('api/dashboard/loggers');
  }

  setLogger(data: any): Observable<void> {
    return this.post<void>('api/dashboard/loggers/', data);
  }

}
