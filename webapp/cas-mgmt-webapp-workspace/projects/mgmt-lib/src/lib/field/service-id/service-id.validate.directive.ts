import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive} from '@angular/core';
import {UserService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Directive for validating the service id for a service.
 *
 * @author Travis Schmidt
 */
@Directive({
    selector: '[libValidateServiceId]',
    providers: [{provide: NG_VALIDATORS, useExisting: ValidateServiceIdDirective, multi: true}]
})

export class ValidateServiceIdDirective implements Validator {
  domainPattern = new RegExp('^\\^?https?\\??://(.*?)(?:[(]?[:/]|$)');
  validDomain = new RegExp('^[a-z0-9-.]*$');
  isTls = new RegExp('^\\^?https://.*$');
  validUrl = new RegExp('^\\^?https://[-a-zA-Z0-9-.]+/?.*');

  constructor(private user: UserService) {
  }

  /**
   * Validates the input in the control.
   *
   * @param control - input control
   */
  validate(control: AbstractControl): {[key: string]: any} {
    const val: string = control.value;
    if (!this.user.user.administrator) {
      if (!this.isTls.test(val).valueOf()) {
        return {noTls: {value: val}};
      }
      if (!this.validUrl.test(val).valueOf()) {
        return {invalidUrl: {value: val}};
      }
      if (!this.validateDomain(control.value)) {
        return {invalidDomain: {value: control.value}};
      }
    }
    return null;
  }

  /**
   * Returns true if the passed string is a valid domain.
   *
   * @param service - url
   */
  validateDomain(service: string): boolean {
    const domain = this.domainPattern.exec(service.toLowerCase());
    if (domain != null) {
      return this.validDomain.test(domain[1]).valueOf();
    }
    return false;
  }
}
