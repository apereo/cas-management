import { Injectable } from '@angular/core';
import { Service } from '@apereo/mgmt-lib/src/lib/ui';
import { ServiceItem } from '@apereo/mgmt-lib/src/lib/model';
import { Observable } from 'rxjs/internal/Observable';

/**
 * Service to handle requests to the server for OAuth services.
 *
 * @author Ryan Mathis
 */
@Injectable({
    providedIn: 'root'
})
export class WsFedService extends Service {

    controller = 'api/services';

    /**
     * Calls the server to retrieve list of OAuth services in the registry.
     */
    getServices(): Observable<ServiceItem[]> {
        return this.get<ServiceItem[]>(this.controller + '/wsfed', 'Loading Services');
    }

}
