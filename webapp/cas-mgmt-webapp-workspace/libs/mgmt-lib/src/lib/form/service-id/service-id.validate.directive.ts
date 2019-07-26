import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive} from '@angular/core';
import {UserService} from 'shared-lib';

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

  validate(control: AbstractControl): {[key: string]: any} {
    const val: string = control.value;
    if (!this.user.user.administrator) {
      if (!this.isTls.test(val).valueOf()) {
        return {'noTls': {value: val}};
      }
      if (!this.validUrl.test(val).valueOf()) {
        return {'invalidUrl': {value: val}};
      }
      if (!this.validateDomain(control.value)) {
        return {'invalidDomain': {value: control.value}};
      }
    }
    return null;
  }

  validateDomain(service: string): boolean {
    const domain = this.domainPattern.exec(service.toLowerCase());
    if (domain != null) {
      return this.validDomain.test(domain[1]).valueOf();
    }
    return false;
  }
}
