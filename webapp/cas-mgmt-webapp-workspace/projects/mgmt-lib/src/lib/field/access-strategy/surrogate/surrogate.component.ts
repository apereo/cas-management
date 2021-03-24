import {Component, Input} from '@angular/core';
import {SurrogateForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display options for Surrogate Access Strategy options.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-surrogate',
  templateUrl: './surrogate.component.html'
})
export class SurrogateComponent {

  @Input()
  form: SurrogateForm;

  @Input()
  options: string[];

  constructor(public config: AppConfigService) {}

}

