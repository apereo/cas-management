import {FormGroup} from '@angular/forms';

/**
 * Interface for form groups.
 */
export interface MgmtFormGroup<T> extends FormGroup {

  /**
   * Maps the form values to the passed service.
   *
   * @param service - service
   */
  map(service: T);

}




