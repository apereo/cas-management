import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService, SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, MetadataForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form for displaying and updating saml metadata options for a service.
 *
 * @author Travis Schmidt
 */
export class TabSamlMetadataForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get metadata() { return this.get('metadata') as MetadataForm; }
  set metadata(c: MetadataForm) {this.setControl('metadata', c); }

  constructor(private service: SamlRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets controls in the form.
   */
  reset(): void {
    this.metadata = new MetadataForm(this.service);
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    this.metadata.map(service as SamlRegisteredService);
  }
}
