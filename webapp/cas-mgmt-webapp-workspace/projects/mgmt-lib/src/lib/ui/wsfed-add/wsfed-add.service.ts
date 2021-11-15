import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WSFederationRegisteredService } from '@apereo/mgmt-lib/src/lib/model';
import { Service } from '../service';
import { map, take } from 'rxjs/operators';

/**
 * Service that makes call to the server to create and return new services.
 *
 * @author Travis Schmidt
 */
@Injectable({
    providedIn: 'root'
})
export class WsFedAddService extends Service {

    /**
     * Returns an OAuth registered service that is created on the server.
     */
    createWsFedService(): Observable<WSFederationRegisteredService> {
        return of(new WSFederationRegisteredService());
    }
}
