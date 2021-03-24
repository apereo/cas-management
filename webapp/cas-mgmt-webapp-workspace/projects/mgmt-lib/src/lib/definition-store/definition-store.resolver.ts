import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {DefaultAttributeDefinition} from '@apereo/mgmt-lib/src/lib/model';
import {EMPTY, Observable, of} from 'rxjs';
import {DefinitionService} from './definition.service';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Resolver to retrieve attribute definitions before navigating to AttributesComponents.
 */
@Injectable({
  providedIn: 'root'
})
export class DefinitionStoreResolver implements Resolve<DefaultAttributeDefinition[]> {

  constructor(private service: DefinitionService,
              private app: AppConfigService) {
  }


  /**
   * Returns a list of Attribute Definitions.
   */
  resolve(): Observable<DefaultAttributeDefinition[]> | DefaultAttributeDefinition[] {
    return this.service.getAttributes()
      .pipe(
        take(1),
        mergeMap(defns => of(defns)),
        catchError(() => {
          this.app.showSnackBar('Unable to load Attribute Definitions');
          return EMPTY;
        })
      );
  }

}
