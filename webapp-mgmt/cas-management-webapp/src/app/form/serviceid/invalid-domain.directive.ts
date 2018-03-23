import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Data} from '../data';
import {Directive, Input} from '@angular/core';

@Directive({
    selector: '[appInvalidDomain]',
    providers: [{provide: NG_VALIDATORS, useExisting: InvalidDomainDirective, multi: true}]
})

export class InvalidDomainDirective implements Validator {
    @Input('appInvalidDomain') serviceVal: Function;

    validate(control: AbstractControl): {[key: string]: any} {
      try {
        const patt = new RegExp(control.value);
      } catch (e) {
        return {'invalidDomain' : {value: control.value}};
      }
      return !this.serviceVal(control.value) ? {'invalidDomain': {value: control.value}} : null;
    }
}
