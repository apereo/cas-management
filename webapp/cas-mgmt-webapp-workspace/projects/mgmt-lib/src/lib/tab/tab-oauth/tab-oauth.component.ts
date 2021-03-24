import {Component} from '@angular/core';
import {OAuthRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';
import {TabOauthForm} from './tab-oauth.form';

/**
 * Component to display/update OAuth CLient.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-oauth',
  templateUrl: './tab-oauth.component.html'
})
export class TabOauthComponent {

  readonly key = 'oauth';
  get tab() { return this.service.form.get(this.key) as TabOauthForm; }
  set tab(f: TabOauthForm) { this.service.form.addControl(this.key, f); }

  constructor(private service: FormService, public config: AppConfigService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabOauthForm(service.registeredService as OAuthRegisteredService);
    }
  }

  /**
   * Calls the server to get a new generated client id.
   */
  generateId() {
    this.config.getRandom().subscribe(id => {
      const control = this.tab.get('clientId');
      control.setValue(id);
      control.markAsTouched();
      control.markAsDirty();
    });
  }

  /**
   * Calls the server to get a new generated secret.
   */
  generateSecret() {
    this.config.getRandom().subscribe(secret => {
      const control = this.tab.get('clientSecret');
      control.setValue(secret);
      control.markAsTouched();
      control.markAsDirty();
    });
  }
}
