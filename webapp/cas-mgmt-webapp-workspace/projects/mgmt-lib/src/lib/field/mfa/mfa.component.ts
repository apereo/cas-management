import {Component, Input} from '@angular/core';
import {MfaPolicyType} from '@apereo/mgmt-lib/src/lib/model';
import {MfaForm} from '@apereo/mgmt-lib/src/lib/form';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update MFA policies for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-mfa',
  templateUrl: './mfa.component.html'
})
export class MfaComponent {

  type: MfaPolicyType;
  TYPE = MfaPolicyType;
  types = [MfaPolicyType.DEFAULT, MfaPolicyType.GROOVY];
  display = ['Default', 'Groovy Script'];

  @Input()
  form: MfaForm;

  @Input()
  typeControl: FormControl;

  constructor() {
  }

}
