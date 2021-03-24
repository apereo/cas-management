import { Component} from '@angular/core';
import {OAuthRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {TabTokenForm} from './tab-tokens.form';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update Token info for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-tokens',
  templateUrl: './tab-tokens.component.html',
  styleUrls: ['./tab-tokens.component.css']
})
export class TabTokensComponent {

  readonly key = 'tokens';
  get tab() { return this.service.form.get(this.key) as TabTokenForm; }
  set tab(f: TabTokenForm) { this.service.form.addControl(this.key, f); }

  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabTokenForm(service.registeredService as OAuthRegisteredService);
    }
  }

}
