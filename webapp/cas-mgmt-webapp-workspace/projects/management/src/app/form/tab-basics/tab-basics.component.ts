import {Component, OnInit} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {
  GroovyRegisteredServiceAccessStrategy,
  OAuthRegisteredService,
  OidcRegisteredService,
  SamlRegisteredService,
  WSFederationRegisterdService,
  RegexRegisteredService
} from 'domain-lib';
import {TabBasicsForm} from './tab-basics.form';

@Component({
  selector: 'app-tab-basics',
  templateUrl: './tab-basics.component.html'
})
export class TabBasicsComponent implements OnInit {

  groovyAccessStrategy: boolean;
  form: TabBasicsForm;
  readonly key = 'basics';

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.groovyAccessStrategy = GroovyRegisteredServiceAccessStrategy.instanceOf(this.data.service.accessStrategy);
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabBasicsForm;
      return;
    }
    this.form = new TabBasicsForm(this.data.service);
    this.form.serviceType.valueChanges.subscribe(val => {
      if (val === OAuthRegisteredService.cName) {
        this.data.service = new OAuthRegisteredService(this.data.service);
      } else if (val === OidcRegisteredService.cName) {
        this.data.service = new OidcRegisteredService(this.data.service);
      } else if (val === SamlRegisteredService.cName) {
        this.data.service = new SamlRegisteredService(this.data.service);
      } else if (val === WSFederationRegisterdService.cName) {
        this.data.service = new WSFederationRegisterdService(this.data.service);
      } else {
        this.data.service = new RegexRegisteredService(this.data.service);
      }
      this.data.typeChange.emit();
    });
    this.data.formMap.set(this.key, this.form);
  }

  isOauth(): boolean {
    return OAuthRegisteredService.instanceOf(this.data.service)
      || OidcRegisteredService.instanceOf(this.data.service);
  }
}
