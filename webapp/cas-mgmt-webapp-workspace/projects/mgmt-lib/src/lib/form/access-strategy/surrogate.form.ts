import {SurrogateRegisteredServiceAccessStrategy} from '@apereo/mgmt-lib/src/lib/model';
import {FormControl} from '@angular/forms';
import {AccessStrategyForm} from './access-strategy.form';
import {AttributesForm} from '../attributes.form';

/**
 * Form group that extends AccessStrategyForm and adds fields for Surrogate Access Strategy.
 *
 * @author Travis Schmidt
 */
export class SurrogateForm extends AccessStrategyForm {

  get surrogateEnabled() { return this.get('surrogateEnabled') as FormControl; }
  get surrogateRequiredAttributes() { return this.get('attributes') as AttributesForm; }

  constructor(strategy: SurrogateRegisteredServiceAccessStrategy) {
    super(strategy);
    this.addControl('surrogateEnabled', new FormControl(strategy?.surrogateEnabled));
    this.addControl('attributes', new AttributesForm(strategy?.surrogateRequiredAttributes));
  }

  /**
   * Maps the form values to the passed SurrogateRegisteredServiceAccessStrategy DTO.
   *
   * @param strategy - strategy to populate
   */
  map(strategy: SurrogateRegisteredServiceAccessStrategy) {
    super.map(strategy);
    strategy.surrogateRequiredAttributes = this.surrogateRequiredAttributes.map();
    strategy.surrogateEnabled = this.surrogateEnabled.value;
  }
}
