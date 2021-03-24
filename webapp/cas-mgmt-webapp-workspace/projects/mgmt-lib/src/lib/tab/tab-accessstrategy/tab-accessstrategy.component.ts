import {Component} from '@angular/core';
import {TabAccessStrategyForm} from './tab-access-strategy-form';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update Access Strategies for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-accessstrategy',
  templateUrl: './tab-accessstrategy.component.html'
})
export class TabAccessstrategyComponent {

  groovyAccessStrategy: boolean;

  get tab() { return this.service.form.get(this.key) as TabAccessStrategyForm; }
  set tab(f: TabAccessStrategyForm) { this.service.form.addControl(this.key, f); }

  readonly key = 'accessStrategy';

  constructor(private service: FormService, public config: AppConfigService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabAccessStrategyForm(service.registeredService.accessStrategy);
    }
  }
}
