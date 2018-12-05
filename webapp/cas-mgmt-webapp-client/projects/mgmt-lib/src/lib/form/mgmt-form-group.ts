import {AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn} from '@angular/forms';
import {AbstractRegisteredService} from '../domain/registered-service';

export abstract class MgmtFormGroup {

  form: FormGroup;

  constructor() {

  }

  abstract formMap();

  abstract mapForm(service: AbstractRegisteredService);

  get(key: string): AbstractControl {
    return this.form.get(key);
  }
}




