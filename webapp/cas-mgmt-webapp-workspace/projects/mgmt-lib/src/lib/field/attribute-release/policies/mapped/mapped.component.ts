import {Component, Input} from '@angular/core';
import {MappedReleaseForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display Mapped Attribute Release Policy.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-mapped',
  templateUrl: './mapped.component.html'
})
export class MappedComponent {

  @Input()
  form: MappedReleaseForm;

  constructor(public config: AppConfigService) {
  }

}
