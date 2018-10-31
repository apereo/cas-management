import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive, Input} from '@angular/core';
import {DataRecord} from '../data';

@Directive({
    selector: '[appInvalidDomain]',
    providers: [{provide: NG_VALIDATORS, useExisting: InvalidDomainDirective, multi: true}]
})

export class InvalidDomainDirective implements Validator {
    @Input() data: DataRecord;

    validate(control: AbstractControl): {[key: string]: any} {
        return this.data && (this.data.invalidDomain || this.data.invalidRegEx) ? {'invalidDomain': {value: control.value}} : null;
    }
}
