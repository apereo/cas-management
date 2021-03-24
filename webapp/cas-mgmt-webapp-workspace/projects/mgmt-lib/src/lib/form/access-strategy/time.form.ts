import {TimeBasedRegisteredServiceAccessStrategy} from '@apereo/mgmt-lib/src/lib/model';
import {AccessStrategyForm} from './access-strategy.form';
import {FormControl} from '@angular/forms';

/**
 * Form group that extends AccessStrategy form and adds fields for Time Access Strategy.
 *
 * @author Travis Schmidt
 */
export class TimeForm extends AccessStrategyForm {

  get startingDate() { return this.get('startingDate') as FormControl; }
  get endingDate() { return this.get('endingDate') as FormControl; }
  get startingTime() { return this.get('startingTime') as FormControl; }
  get endingTime() { return this.get('endingTime') as FormControl; }

  constructor(strategy: TimeBasedRegisteredServiceAccessStrategy) {
    super(strategy);
    this.addControl('startingDate', new FormControl(strategy?.startingDate));
    this.addControl('endingDate', new FormControl(strategy?.endingDate));
    this.addControl('startingTime', new FormControl(strategy?.startingTime));
    this.addControl('endingTime', new FormControl(strategy?.endingTime));
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param strategy - TimeBasedRegisteredServiceAccessStrategy
   */
  map(strategy: TimeBasedRegisteredServiceAccessStrategy) {
    super.map(strategy);
    strategy.startingDate = this.startingDate.value;
    strategy.endingDate = this.endingDate.value;
    strategy.startingTime = this.startingTime.value;
    strategy.endingTime = this.endingTime.value;
  }
}
