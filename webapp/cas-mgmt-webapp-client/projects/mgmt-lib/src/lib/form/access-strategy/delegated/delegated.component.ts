import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatChipInputEvent} from '@angular/material';
import {DataRecord} from '../../data';
import {DefaultRegisteredServiceDelegatedAuthenticationPolicy} from '../../../domain/delegated-authn';
import {FormData} from '../../../domain/form-data';

@Component({
  selector: 'lib-delegated',
  templateUrl: './delegated.component.html',
  styleUrls: ['./delegated.component.css']
})
export class DelegatedComponent implements OnInit {

  separatorKeysCodes = [ENTER, COMMA];
  delegatedAuthn: String[] = [];

  formData: FormData;

  @ViewChild( MatAutocompleteTrigger )
  autoTrigger: MatAutocompleteTrigger;

  @ViewChild('providerInput')
  providerInput: ElementRef;



  constructor(public data: DataRecord) {
    this.formData = data.formData;
  }

  ngOnInit() {
    const service = this.data.service;

    if (service.accessStrategy.delegatedAuthenticationPolicy) {
      this.delegatedAuthn = (service.accessStrategy.delegatedAuthenticationPolicy as
        DefaultRegisteredServiceDelegatedAuthenticationPolicy).allowedProviders
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.delegatedAuthn.push(value.trim());
      this.changeDelegatedAuthns();
      this.autoTrigger.closePanel();
    }

    if (input) {
      input.value = '';
    }
  }

  remove(provider: any): void {
    const index = this.delegatedAuthn.indexOf(provider);

    if (index >= 0) {
      this.delegatedAuthn.splice(index, 1);
    }
    this.changeDelegatedAuthns();
  }

  changeDelegatedAuthns() {
    if (this.delegatedAuthn.length === 0) {
      this.data.service.accessStrategy.delegatedAuthenticationPolicy = null;
    } else {
      const policy = new DefaultRegisteredServiceDelegatedAuthenticationPolicy();
      policy.allowedProviders = this.delegatedAuthn;
      this.data.service.accessStrategy.delegatedAuthenticationPolicy = policy;
    }
  }

  selection(val: MatAutocompleteSelectedEvent) {
    const value =  val.option.value;
    if ((value || '').trim()) {
      this.delegatedAuthn.push(value.trim());
      this.changeDelegatedAuthns();
    }

    if (this.providerInput) {
      this.providerInput.nativeElement.value = '';
    }
  }
}
