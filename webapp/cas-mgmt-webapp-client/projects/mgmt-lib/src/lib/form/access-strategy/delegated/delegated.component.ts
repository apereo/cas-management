import {Component, ElementRef, forwardRef, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatChipInputEvent} from '@angular/material';
import {DataRecord} from '../../data';
import {DefaultRegisteredServiceDelegatedAuthenticationPolicy} from '../../../domain/delegated-authn';
import {FormData} from '../../../domain/form-data';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {HasControls} from '../../has-controls';

@Component({
  selector: 'lib-delegated',
  templateUrl: './delegated.component.html',
  styleUrls: ['./delegated.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => DelegatedComponent)
  }]
})
export class DelegatedComponent extends HasControls implements OnInit {

  separatorKeysCodes = [ENTER, COMMA];
  delegatedAuthn: String[] = [];

  formData: FormData;

  @ViewChild( MatAutocompleteTrigger )
  autoTrigger: MatAutocompleteTrigger;

  @ViewChild('providerInput')
  providerInput: ElementRef;

  providerGroup: FormGroup;
  providerArray: FormArray;


  constructor(public data: DataRecord) {
    super();
    this.formData = data.formData;
  }

  getControls(): Map<string, AbstractControl> {
    let c: Map<string, AbstractControl> = new Map();
    c.set('allowedProviders', this.providerArray);
    return c;
  }

  ngOnInit() {
    const service = this.data.service;

    this.providerArray = new FormArray([]);
    this.providerGroup = new FormGroup({
      providers: this.providerArray
    })
    if (service.accessStrategy.delegatedAuthenticationPolicy) {
      this.delegatedAuthn = (service.accessStrategy.delegatedAuthenticationPolicy as
        DefaultRegisteredServiceDelegatedAuthenticationPolicy).allowedProviders
      for (let provider of this.delegatedAuthn) {
        this.providerArray.push(new FormControl(provider));
      }
    }

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.providerArray.push(new FormControl(value.trim()));
      this.autoTrigger.closePanel();
    }

    if (input) {
      input.value = '';
    }
  }

  remove(index: number): void {

    if (index >= 0) {
      this.providerArray.removeAt(index);
    }
  }


  selection(val: MatAutocompleteSelectedEvent) {
    const value =  val.option.value;
    if ((value || '').trim()) {
      this.delegatedAuthn.push(value.trim());
    }

    if (this.providerInput) {
      this.providerInput.nativeElement.value = '';
    }
  }
}
