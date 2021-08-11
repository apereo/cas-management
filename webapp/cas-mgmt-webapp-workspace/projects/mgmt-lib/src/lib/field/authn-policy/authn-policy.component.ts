import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {AuthenticationPolicyForm, FormService} from "@apereo/mgmt-lib/src/lib/form";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';
import {CriteriaType, RegisteredServiceAuthenticationPolicy} from '@apereo/mgmt-lib/src/lib/model';

@Component({
  selector: 'lib-authn-policy',
  templateUrl: './authn-policy.component.html',
  styleUrls: ['./authn-policy.component.css']
})
export class AuthenticationPolicyComponent implements OnChanges {

  type: CriteriaType;
  TYPE = CriteriaType;
  types = [
    {value: CriteriaType.ALLOWED_AUTHN_HANDLERS, display: 'Allowed Authentication Handlers'},
    {value: CriteriaType.EXCLUDED_AUTHN_HANDLERS, display: 'Excluded Authentication Handlers'}
  ];

  separatorKeysCodes = [ENTER, COMMA];
  requiredAuthenticationHandlers: string[] = [];
  excludedAuthenticationHandlers: string[] = [];

  /*@ViewChild('autoRequiredHandler', { static: true })
  autoRequiredTrigger: MatAutocompleteTrigger;*/

  @ViewChild('requiredHandlerInput', { static: true })
  requiredHandlerInput: ElementRef;

  /*@ViewChild('autoExcludedHandler', { static: true })
  autoExcludedTrigger: MatAutocompleteTrigger;*/

  @ViewChild('excludedHandlerInput', { static: true })
  excludedHandlerInput: ElementRef;

  @Input()
  form: AuthenticationPolicyForm;

  constructor(public config: AppConfigService, private service: FormService) {
    this.reset(this.service?.registeredService?.authenticationPolicy);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.form) {
      this.reset(this.form.value);
    }
  }

  reset(policy: RegisteredServiceAuthenticationPolicy): void {
    this.requiredAuthenticationHandlers = [];
    this.excludedAuthenticationHandlers = [];
    policy?.requiredAuthenticationHandlers?.forEach(h => {
      this.requiredAuthenticationHandlers.push(h);
    });
    policy?.excludedAuthenticationHandlers?.forEach(h => {
      this.excludedAuthenticationHandlers.push(h);
    });
  }

  addRequiredHandler(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.requiredAuthenticationHandlers.push(value.trim());
      //this.autoRequiredTrigger.closePanel();
      this.form.requiredAuthenticationHandlers.markAsTouched();
      this.form.requiredAuthenticationHandlers.markAsDirty();
      this.form.requiredAuthenticationHandlers.setValue(this.requiredAuthenticationHandlers);
    }

    if (input) {
      input.value = '';
    }
  }


  addExcludedHandler(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.excludedAuthenticationHandlers.push(value.trim());
      //this.autoExcludedTrigger.closePanel();
      this.form.excludedAuthenticationHandlers.markAsTouched();
      this.form.excludedAuthenticationHandlers.markAsDirty();
      this.form.excludedAuthenticationHandlers.setValue(this.excludedAuthenticationHandlers);
    }

    if (input) {
      input.value = '';
    }
  }

  removeRequiredHandler(handler: any): void {
    const index = this.requiredAuthenticationHandlers.indexOf(handler);

    if (index >= 0) {
      this.requiredAuthenticationHandlers.splice(index, 1);
      this.form.requiredAuthenticationHandlers.markAsTouched();
      this.form.requiredAuthenticationHandlers.markAsDirty();
      this.form.requiredAuthenticationHandlers.setValue(this.requiredAuthenticationHandlers);
    }
  }

  removeExcludedHandler(handler: any): void {
    const index = this.excludedAuthenticationHandlers.indexOf(handler);

    if (index >= 0) {
      this.excludedAuthenticationHandlers.splice(index, 1);
      this.form.excludedAuthenticationHandlers.markAsTouched();
      this.form.excludedAuthenticationHandlers.markAsDirty();
      this.form.excludedAuthenticationHandlers.setValue(this.excludedAuthenticationHandlers);
    }
  }

  selectionRequiredHandler(val: MatAutocompleteSelectedEvent) {
    const value =  val.option.value;
    if ((value || '').trim()) {
      this.requiredAuthenticationHandlers.push(value.trim());
      this.form.requiredAuthenticationHandlers.markAsTouched();
      this.form.requiredAuthenticationHandlers.markAsDirty();
      this.form.requiredAuthenticationHandlers.setValue(this.requiredAuthenticationHandlers);
    }

    if (this.requiredHandlerInput) {
      this.requiredHandlerInput.nativeElement.value = '';
    }
  }

  selectionExcludedHandler(val: MatAutocompleteSelectedEvent) {
    const value =  val.option.value;
    if ((value || '').trim()) {
      this.excludedAuthenticationHandlers.push(value.trim());
      this.form.excludedAuthenticationHandlers.markAsTouched();
      this.form.excludedAuthenticationHandlers.markAsDirty();
      this.form.excludedAuthenticationHandlers.setValue(this.requiredAuthenticationHandlers);
    }

    if (this.excludedHandlerInput) {
      this.excludedHandlerInput.nativeElement.value = '';
    }
  }
}
