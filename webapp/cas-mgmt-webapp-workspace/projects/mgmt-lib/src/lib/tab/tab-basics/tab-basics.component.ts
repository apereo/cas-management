import {Component} from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {
  OAuthRegisteredService,
  OidcRegisteredService,
  SamlRegisteredService,
  WSFederationRegisterdService,
  RegexRegisteredService
} from '@apereo/mgmt-lib/src/lib/model';
import {TabBasicsForm} from './tab-basics.form';

/**
 * Component to display/update basic options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-basics',
  templateUrl: './tab-basics.component.html'
})
export class TabBasicsComponent {

  readonly key = 'basics';
  groovyAccessStrategy: boolean;
  get tab() { return this.service.form.get(this.key) as TabBasicsForm; }
  set tab(f: TabBasicsForm) { this.service.form.addControl(this.key, f); }

  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabBasicsForm(service.registeredService);
      this.tab.serviceType.valueChanges.subscribe(val => {
        if (val === OAuthRegisteredService.cName) {
          service.registeredService = new OAuthRegisteredService(service.registeredService);
        } else if (val === OidcRegisteredService.cName) {
          service.registeredService = new OidcRegisteredService(service.registeredService);
        } else if (val === SamlRegisteredService.cName) {
          service.registeredService = new SamlRegisteredService(service.registeredService);
        } else if (val === WSFederationRegisterdService.cName) {
          service.registeredService = new WSFederationRegisterdService(service.registeredService);
        } else {
          service.registeredService = new RegexRegisteredService(service.registeredService);
        }
        service.typeChange.emit();
      });
    }
  }

  /**
   * Returns true if the current service is an instance of OAuthRegisteredService.
   */
  isOauth(): boolean {
    return OAuthRegisteredService.instanceOf(this.service.registeredService)
      || OidcRegisteredService.instanceOf(this.service.registeredService);
  }

  /**
   * Returns true if the current service is an instance of SamlRegisteredService.
   */
  isSaml(): boolean {
    return SamlRegisteredService.instanceOf(this.service.registeredService);
  }
}
