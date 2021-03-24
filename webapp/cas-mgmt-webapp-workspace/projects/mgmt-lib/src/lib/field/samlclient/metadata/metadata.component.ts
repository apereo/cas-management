import {Component, Input} from '@angular/core';
import {MetadataForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update SAML metadata options.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-metadata',
  templateUrl: './metadata.component.html'
})
export class SamlMetadataComponent {

  @Input()
  form: MetadataForm;

  constructor(public config: AppConfigService) {
  }

}
