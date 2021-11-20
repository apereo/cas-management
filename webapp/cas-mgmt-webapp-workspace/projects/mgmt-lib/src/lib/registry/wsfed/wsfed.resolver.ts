import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { WsFedService } from './wsfed.service';
import { Observable } from 'rxjs/internal/Observable';
import { ServiceItem } from '@apereo/mgmt-lib/src/lib/model';

/**
 * Resolver to retrieve list of OAuth services before navigating to OAuthComponent.
 *
 * @author Ryan Mathis
 */
@Injectable({
    providedIn: 'root'
})
export class WsFedResolve implements Resolve<ServiceItem[]> {

    constructor(private service: WsFedService) { }

    /**
     * Returns list of all registered WsFed services in the registry.
     *
     * @param route - route snapshot
     */
    resolve(route: ActivatedRouteSnapshot): Observable<ServiceItem[]> | ServiceItem[] {
        return this.service.getServices();
    }
}
