import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {SsoPolicyType} from '../../../domain/sso-expiration';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-sso-chain',
  templateUrl: './sso-chain.component.html'
})

export class SsoChainComponent implements OnInit {

  selectedPolicy: number;

  @ViewChild('accordian', { static: true })
  accordian: ElementRef;

  @Input()
  control: FormGroup;

  policies: FormArray;
  ssoEnabled: MgmtFormControl;

  @Output()
  addPolicy: EventEmitter<SsoPolicyType> = new EventEmitter<SsoPolicyType>();

  TYPE = SsoPolicyType;

  constructor() {
  }

  ngOnInit() {
    this.policies = this.control.get('policies') as FormArray;
    this.ssoEnabled = this.control.get('ssoEnabled') as MgmtFormControl;
  }

  removePolicy() {
    this.policies.removeAt(this.selectedPolicy);
    this.policies.markAsTouched();
    this.policies.markAsDirty();
  }

  isLastUsed(policy: FormGroup): boolean {
    return policy.get('type').value === SsoPolicyType.LAST_USED;
  }

  isAuthDate(policy: FormGroup): boolean {
    return policy.get('type').value === SsoPolicyType.AUTH_DATE;
  }

  moveUp() {
    const index = this.selectedPolicy;
    const up = this.policies.controls[index];
    this.policies.controls[index] = this.policies.controls[index - 1];
    this.policies.controls[index - 1] = up;
    this.policies.markAsTouched();
    this.policies.markAsDirty();
  }

  moveDown() {
    const index = this.selectedPolicy;
    const down = this.policies.controls[index];
    this.policies.controls[index] = this.policies.controls[index + 1];
    this.policies.controls[index + 1] = down;
    this.policies.markAsTouched();
    this.policies.markAsDirty();
  }

}
