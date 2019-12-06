import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, MetadataForm} from 'mgmt-lib';
import {AbstractRegisteredService, SamlRegisteredService} from 'domain-lib';

export class TabSamlMetadataForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get metadata() { return this.get('metadata') as MetadataForm; }

  constructor(public service: SamlRegisteredService) {
    super({
      metadata: new MetadataForm(service)
    });
  }

  mapForm(service: AbstractRegisteredService) {
    this.metadata.mapForm(service as SamlRegisteredService);
  }
}
