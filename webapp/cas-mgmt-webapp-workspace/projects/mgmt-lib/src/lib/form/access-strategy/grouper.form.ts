import {TimeForm} from './time.form';
import {GrouperRegisteredServiceAccessStrategy} from '@apereo/mgmt-lib/src/lib/model';
import {FormControl} from '@angular/forms';

/**
 * Form that extends TimeForm and adds grouper options.
 *
 * @author Travis Schmidt
 */
export class GrouperForm extends TimeForm {

  get groupField() { return this.get('groupField') as FormControl; }

  constructor(strategy: GrouperRegisteredServiceAccessStrategy) {
    super(strategy);
    this.addControl('groupField', new FormControl(strategy?.groupField));
  }

  /**
   * Maps the form values to the passed GrouperRegisteredServiceAccessStrategy DTO.
   *
   * @param strategy - strategy to populate
   */
  map(strategy: GrouperRegisteredServiceAccessStrategy) {
    strategy.groupField = this.groupField.value;
    super.map(strategy);
  }
}
