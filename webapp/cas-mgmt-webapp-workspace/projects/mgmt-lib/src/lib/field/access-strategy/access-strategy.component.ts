import {Component, Input} from '@angular/core';
import {AccessStrategyForm} from '@apereo/mgmt-lib/src/lib/form';
import {AccessStrategyType} from '@apereo/mgmt-lib/src/lib/model';
import {FormControl} from '@angular/forms';

/**
 * Component used to manage Access Strategy policies for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-access-strategy',
  templateUrl: './access-strategy.component.html'
})
export class AccessStrategyComponent {

  @Input()
  form: AccessStrategyForm;

  @Input()
  type: FormControl;

  TYPE = AccessStrategyType;

  types = [
    {value: AccessStrategyType.DEFAULT, display: 'DEFAULT'},
    {value: AccessStrategyType.TIME, display: 'TIME'},
    {value: AccessStrategyType.GROUPER, display: 'GROUPER'},
    {value: AccessStrategyType.REMOTE, display: 'REMOTE'},
    {value: AccessStrategyType.SURROGATE, display: 'SURROGATE'},
    {value: AccessStrategyType.GROOVY_SURROGATE, display: 'GROOVY_SURROGATE'},
    {value: AccessStrategyType.GROOVY, display: 'GROOVY'}
  ];

  constructor() {
  }

}
