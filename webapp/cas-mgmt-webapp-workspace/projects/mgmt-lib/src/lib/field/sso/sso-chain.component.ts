import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {
  ssoParticipationPolicy,
  SsoPolicyType
} from '@apereo/mgmt-lib/src/lib/model';
import {ChainingSsoForm, createSsoForm, SsoPolicyForm, SsoForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/updated chained sso policies for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-sso-chain',
  templateUrl: './sso-chain.component.html'
})

export class SsoComponent {

  selectedPolicy: number;

  @ViewChild('accordian', { static: true })
  accordian: ElementRef;

  @Input()
  form: SsoForm;

  TYPE = SsoPolicyType;

  /**
   * Cast the form to ChainingSsoForm.
   */
  chaining(): ChainingSsoForm {
    return this.form.policy as ChainingSsoForm;
  }

  /**
   * Removed the selected poilicy from the chain.
   */
  removePolicy() {
    this.chaining().policies.removeAt(this.selectedPolicy);
  }

  /**
   * Returns true if the passed object is an instance of LastUsed.
   *
   * @param policy - sso policy
   */
  isLastUsed(policy: SsoPolicyForm): boolean {
    return policy.type === SsoPolicyType.LAST_USED;
  }

  /**
   * Returns true if the passed object is an instance of AuthDate.
   *
   * @param policy - sso policy
   */
  isAuthDate(policy: SsoPolicyForm): boolean {
    return policy.type === SsoPolicyType.AUTH_DATE;
  }

  /**
   * Moves the selected policy up the chain.
   */
  moveUp() {
    const index = this.selectedPolicy;
    const chain = this.chaining().policies;
    const up = chain.controls[index];
    chain.controls[index] = chain.controls[index - 1];
    chain.controls[index - 1] = up;
    chain.markAsTouched();
    chain.markAsDirty();
  }

  /**
   * Moves the selected policy down the chain.
   */
  moveDown() {
    const index = this.selectedPolicy;
    const chain = this.chaining().policies;
    const down = chain.controls[index];
    chain.controls[index] = chain.controls[index + 1];
    chain.controls[index + 1] = down;
    chain.markAsTouched();
    chain.markAsDirty();
  }

  /**
   * Adds a new policy at the end of the chain of the type passed in.
   *
   * @param type - sso policy type
   */
  addPolicy(type: SsoPolicyType) {
    this.chaining().policies.push(createSsoForm(ssoParticipationPolicy(null, type)));
  }

}
