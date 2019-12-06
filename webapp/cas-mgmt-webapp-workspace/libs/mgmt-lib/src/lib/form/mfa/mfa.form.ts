import {FormGroup} from '@angular/forms';
import {RegisteredServiceMultifactorPolicy} from 'domain-lib';

export abstract class MfaForm extends FormGroup {

  abstract mapForm(policy: RegisteredServiceMultifactorPolicy);

}
