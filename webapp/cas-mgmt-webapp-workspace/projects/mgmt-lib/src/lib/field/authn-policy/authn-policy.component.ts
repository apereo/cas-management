import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {AuthenticationPolicyForm, FormService} from "@apereo/mgmt-lib/src/lib/form";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

@Component({
  selector: 'lib-authn-policy',
  templateUrl: './authn-policy.component.html',
  styleUrls: ['./authn-policy.component.css']
})
export class AuthenticationPolicyComponent {

  separatorKeysCodes = [ENTER, COMMA];
  requiredAuthenticationHandlers: string[] = [];
  excludedAuthenticationHandlers: string[] = [];

  @ViewChild(MatAutocompleteTrigger, { static: true })
  autoTrigger: MatAutocompleteTrigger;

  @ViewChild('requiredHandlerInput', { static: true })
  requiredHandlerInput: ElementRef;

  @Input()
  form: AuthenticationPolicyForm;

  constructor(public config: AppConfigService, private service: FormService) {
    let policy = service?.registeredService?.authenticationPolicy;
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
      this.autoTrigger.closePanel();
      this.form.requiredAuthenticationHandlers.setValue(this.requiredAuthenticationHandlers);
      this.form.requiredAuthenticationHandlers.markAsTouched();
      this.form.requiredAuthenticationHandlers.markAsDirty();
    }

    if (input) {
      input.value = '';
    }
  }


  removeRequiredHandler(handler: any): void {
    const index = this.requiredAuthenticationHandlers.indexOf(handler);

    if (index >= 0) {
      this.requiredAuthenticationHandlers.splice(index, 1);
      this.form.requiredAuthenticationHandlers.setValue(this.requiredAuthenticationHandlers);
      this.form.requiredAuthenticationHandlers.markAsTouched();
      this.form.requiredAuthenticationHandlers.markAsDirty();
    }
  }

  selectionRequiredHandler(val: MatAutocompleteSelectedEvent) {
    const value =  val.option.value;
    if ((value || '').trim()) {
      this.requiredAuthenticationHandlers.push(value.trim());
      this.form.requiredAuthenticationHandlers.setValue(this.requiredAuthenticationHandlers);
      this.form.requiredAuthenticationHandlers.markAsTouched();
      this.form.requiredAuthenticationHandlers.markAsDirty();
    }

    if (this.requiredHandlerInput) {
      this.requiredHandlerInput.nativeElement.value = '';
    }
  }
}
