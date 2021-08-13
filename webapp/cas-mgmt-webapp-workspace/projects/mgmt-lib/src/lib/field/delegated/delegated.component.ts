import {Component, ElementRef, Input, SimpleChanges, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {DelegatedForm, FormService} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';
import { RegisteredServiceDelegatedAuthenticationPolicy } from '@apereo/mgmt-lib/src/lib/model';

/**
 * Component for displaying allowed delegated authenticators.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-delegated',
  templateUrl: './delegated.component.html'
})
export class DelegatedComponent {

  separatorKeysCodes = [ENTER, COMMA];
  delegatedAuthn: string[] = [];

  @ViewChild(MatAutocompleteTrigger, { static: true })
  autoTrigger: MatAutocompleteTrigger;

  @ViewChild('providerInput', { static: true })
  providerInput: ElementRef;

  @Input()
  form: DelegatedForm;

  @Input()
  providers: string[];

  constructor(public config: AppConfigService, private service: FormService) {
    this.reset(this.service?.registeredService?.accessStrategy?.delegatedAuthenticationPolicy);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.form) {
      this.reset(this.form.value);
    }
  }

  reset(policy: RegisteredServiceDelegatedAuthenticationPolicy): void {
    this.delegatedAuthn = [];
    policy?.allowedProviders?.forEach(provider => {
      this.delegatedAuthn.push(provider);
    });
  }

  /**
   * Handles adding a delegated authenticator the allowed list.
   *
   * @param event - input event
   */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.delegatedAuthn.push(value.trim());
      this.autoTrigger.closePanel();
      this.form.allowedProviders.markAsTouched();
      this.form.allowedProviders.markAsDirty();
      this.form.allowedProviders.setValue(this.delegatedAuthn);
    }

    if (input) {
      input.value = '';
    }
  }

  /**
   * Removes the passed provider from the list of allowed providers.
   *
   * @param provider - provider name
   */
  remove(provider: any): void {
    const index = this.delegatedAuthn.indexOf(provider);

    if (index >= 0) {
      this.delegatedAuthn.splice(index, 1);
      this.form.allowedProviders.markAsTouched();
      this.form.allowedProviders.markAsDirty();
      this.form.allowedProviders.setValue(this.delegatedAuthn);
    }
  }

  /**
   * Handles the autocomplete selection to add an allowed provider.
   *
   * @param val - autocomplete selection event
   */
  selection(val: MatAutocompleteSelectedEvent) {
    const value =  val.option.value;
    if ((value || '').trim()) {
      this.delegatedAuthn.push(value.trim());
      this.form.allowedProviders.markAsTouched();
      this.form.allowedProviders.markAsDirty();
      this.form.allowedProviders.setValue(this.delegatedAuthn);
    }

    if (this.providerInput) {
      this.providerInput.nativeElement.value = '';
    }
  }
}
