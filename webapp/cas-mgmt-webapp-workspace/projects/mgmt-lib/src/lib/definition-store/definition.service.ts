import {Injectable} from '@angular/core';
import {DefaultAttributeDefinition} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable} from 'rxjs';

/**
 * Service to handle requests for Attribute definitions.
 */
@Injectable({
  providedIn: 'root'
})
export class DefinitionService extends Service {

  controller = 'api/attributes';

  /**
   * Returns the list of defined attribute definitions.
   */
  getAttributes(): Observable<DefaultAttributeDefinition[]> {
    return this.get<DefaultAttributeDefinition[]>(this.controller);
  }

  /**
   * Calls the server to get the attribute definition with the passed key.
   * @param key - attribute key
   */
  getAttribute(key: string): Observable<DefaultAttributeDefinition> {
    return this.get<DefaultAttributeDefinition>(this.controller + '/' + key);
  }

  /**
   * Saves a definition to the store.
   *
   * @param defintion - Definition
   */
  save(defintion: DefaultAttributeDefinition): Observable<void> {
    return this.post<void>(this.controller, defintion);
  }

  /**
   * Removes a definition from the definition store.
   *
   * @param key - key of definition to remove.
   */
  deleteAttribute(key: string): Observable<void> {
    return this.delete(this.controller + '/' + key);
  }

}
