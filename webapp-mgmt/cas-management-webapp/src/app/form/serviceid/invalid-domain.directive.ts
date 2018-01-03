import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Data} from '../data';
import {Directive, Input} from '@angular/core';

@Directive({
    selector: '[appInvalidDomain]',
    providers: [{provide: NG_VALIDATORS, useExisting: InvalidDomainDirective, multi: true}]
})

export class InvalidDomainDirective implements Validator {
    @Input() data: Data;

    validate(control: AbstractControl): {[key: string]: any} {
        return this.data && (this.data.invalidDomain || this.data.invalidRegEx) ? {'invalidDomain': {value: control.value}} : null;
    }
}
