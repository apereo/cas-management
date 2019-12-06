import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {
  ChainingRegisteredServiceSingleSignOnParticipationPolicy,
  ssoParticipationPolicy,
  SsoPolicyType
} from 'domain-lib';
import {SsoForm} from './sso.form';
import {ChainingSsoForm, createSsoForm, SsoPolicyForm} from './policy/sso-policy.form';

@Component({
  selector: 'lib-sso-chain',
  templateUrl: './sso-chain.component.html'
})

export class SsoComponent implements OnInit {

  selectedPolicy: number;

  @ViewChild('accordian', { static: true })
  accordian: ElementRef;

  @Input()
  form: SsoForm;

  TYPE = SsoPolicyType;

  constructor() {
  }

  ngOnInit() {
  }

  chaining(): ChainingSsoForm {
    return this.form.policy as ChainingSsoForm;
  }

  removePolicy() {
    this.chaining().policies.removeAt(this.selectedPolicy);
  }

  isLastUsed(policy: SsoPolicyForm): boolean {
    return policy.type === SsoPolicyType.LAST_USED;
  }

  isAuthDate(policy: SsoPolicyForm): boolean {
    return policy.type === SsoPolicyType.AUTH_DATE;
  }

  moveUp() {
    const index = this.selectedPolicy;
    const chain = this.chaining().policies;
    const up = chain.controls[index];
    chain.controls[index] = chain.controls[index - 1];
    chain.controls[index - 1] = up;
    chain.markAsTouched();
    chain.markAsDirty();
  }

  moveDown() {
    const index = this.selectedPolicy;
    const chain = this.chaining().policies;
    const down = chain.controls[index];
    chain.controls[index] = chain.controls[index + 1];
    chain.controls[index + 1] = down;
    chain.markAsTouched();
    chain.markAsDirty();
  }

  addPolicy(type: SsoPolicyType) {
    this.chaining().policies.push(createSsoForm(ssoParticipationPolicy(null, type)));
  }

}
