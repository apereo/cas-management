import { Injectable } from '@angular/core';
import { AbstractRegisteredService } from '@apereo/mgmt-lib/src/lib/model';
import { Service } from '../service';
import { Observable } from 'rxjs/internal/Observable';

/**
 * Service for handling request to the server for registered services.
 *
 * @author Ryan Mathis
 */
@Injectable({
    providedIn: 'root'
})
export class PreviewService extends Service {

    controller = 'api/services';

    /**
     * Calls the server to validate and return a parsed service.
     *
     */

    validate(format: string, service: AbstractRegisteredService): Observable<unknown> {
        return this.postText(`${this.controller}/validate?format=${format}`, this.removeNull(service));
    }


    private removeNull(data) {
        return JSON.parse(JSON.stringify(data), (key, value) => {
            if (value == null || value == '' || value == [] || value == {}) {
                return undefined;
            }
                
            return value;
        });
    }
}
