import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive} from '@angular/core';
import {UserService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Directive to validate input of SAML entity ids.
 *
 * @author Travis Schmidt
 */
@Directive({
    selector: '[libValidateEntityId]',
    providers: [{provide: NG_VALIDATORS, useExisting: ValidateEntityIdDirective, multi: true}]
})

export class ValidateEntityIdDirective implements Validator {
  validUrl = new RegExp('^\\^?https?://[-a-zA-Z0-9-.]+/?.*');
  validUrn = new RegExp('^\\^?urn:mace:[-a-zA-Z0-9-.]+/?.*');

  constructor(private user: UserService) {
  }

  /**
   * Validates the input from control to make sure it is a valid entityId.
   *
   * @param control - the form control
   */
  validate(control: AbstractControl): {[key: string]: any} {
    const val: string = control.value;
    if (!this.user.user.administrator) {
      if (this.validUrl.test(val).valueOf() || this.validUrn.test(val).valueOf()) {
        return null;
      } else {
        return {invalidEntityId: {value: val}};
      }
    }
    return null;
  }

}
