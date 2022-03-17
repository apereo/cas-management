import {Service} from '@apereo/mgmt-lib';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Server} from '../domain/dashboard.model';
import {Cache} from '../domain/cache.model';
import {AuditLog} from '../domain/audit.model';
import {Logger} from '../domain/logger.model';

import webflow from '../webflow/springWebflow.json';
import { SpringWebflow } from '../webflow/webflow.model';
import { map } from 'rxjs/operators';

/**
 * Service to handle requests to the server for dashboard functionality.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: "root",
})
export class DashboardService extends Service {
  /**
   * Calls server to get Cache statistics from the CAS servers.
   */
  getCache(): Observable<Cache> {
    return this.get<Cache>("api/dashboard/cache");
  }

  /**
   * Calls the server to get the status of each CAS server in the cluster.
   */
  getStatus(): Observable<Server[]> {
    return this.get<Server[]>("api/dashboard");
  }

  /**
   * Calls the server to get a status update on teh CAS server at the passed index.
   *
   * @param index - index of CAS server in cluster
   */
  getUpdate(index: number): Observable<Server> {
    return this.get<Server>("api/dashboard/" + index);
  }

  /**
   * Calls server to resolve base attributes released for the passed user id.
   *
   * @param uid - user id to resolve
   */
  getResolve(uid: string): Observable<Map<string, string[]>> {
    return this.get<Map<string, string[]>>(
      "api/dashboard/resolve/" + uid,
      "Resolving"
    );
  }

  /**
   * Calls server to get the attributes that will be released for passed credentials and service.
   *
   * @param data - user credentials and service to resolve
   */
  getRelease(data: any): Observable<Map<string, string[]>> {
    return this.post<Map<string, string[]>>(
      "api/dashboard/release",
      data,
      "Authenticating"
    );
  }

  /**
   * Calls the server to get the generated SAML response for the passed credentials and SP entityId.
   *
   * @param data - user credentials and SP entityId to resolve
   */
  getResponse(data: any): Observable<string> {
    return this.postText("api/dashboard/response", data, "Authenticating");
  }

  /**
   * Calls the server to get info on the current CAS instance deployed.
   */
  getInfo(): Observable<Map<string, string>> {
    return this.get<Map<string, string>>("api/dashboard/info");
  }

  /**
   * Calls server to get Cache statistics from the CAS servers.
   */
  getFlow(): Observable<SpringWebflow> {
    return of(webflow as SpringWebflow);
  }

  /**
   * Calls the server with query options for finding audit logs on all CAS servers in the cluster.
   *
   * @param data - query options.
   */
  getAudit(data: any): Observable<AuditLog[]> {
    return this.post<AuditLog[]>("api/dashboard/audit", data, "Searching");
  }

  /**
   * Calls the server to download the results of querying for audit logs.
   *
   * @param data - query options
   */
  downloadAudit(data: any): Observable<void> {
    return this.post<void>("api/dashboard/audit/download", data, "Downloading");
  }

  /**
   * Calls the server to get all configured loggers for each CAS server in the cluster.
   */
  getLoggers(): Observable<Map<string, Map<string, Logger>>> {
    return this.get<Map<string, Map<string, Logger>>>("api/dashboard/loggers");
  }

  /**
   * Calls teh server to update the logging level of a logger on a CAS Server.
   *
   * @param data - params for logger
   */
  setLogger(data: any): Observable<void> {
    return this.post<void>("api/dashboard/loggers/", data);
  }

  /**
   * Looks up an SP by entity id that is registered for the CAS instance.
   *
   * @param query - partial text of sp entity id.
   */
  lookupEntity(query: string): Observable<string[]> {
    return this.get<string[]>(
      "api/saml/find?query=" + query,
      "Looking up entity"
    );
  }
}
