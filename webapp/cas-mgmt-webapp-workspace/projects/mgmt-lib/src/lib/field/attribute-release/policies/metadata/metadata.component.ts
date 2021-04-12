import {Component, Input} from '@angular/core';
import {MetadataReleaseForm} from '@apereo/mgmt-lib/src/lib/form';
/**
 * Component to display Metadata Entity Release Attribute.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-metadata-release',
  templateUrl: './metadata.component.html'
})
export class MetadataComponent {

  @Input()
  form: MetadataReleaseForm;

  constructor() {
  }

}
