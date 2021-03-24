import {Component} from '@angular/core';
import {DefaultRegisteredServiceContact} from '@apereo/mgmt-lib/src/lib/model';
import {FormService, ServiceForm} from '@apereo/mgmt-lib/src/lib/form';
import {UserService} from '@apereo/mgmt-lib/src/lib/ui';
import {TabContactsForm} from './tab-contacts.form';

/**
 * Component to display/update Contacts for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-contacts',
  templateUrl: './tab-contacts.component.html'
})
export class TabContactsComponent {

  readonly key = 'contacts';
  get tab() { return this.service.form.get(this.key) as TabContactsForm; }
  set tab(f: TabContactsForm) { this.service.form.addControl(this.key, f); }

  constructor(public service: FormService,
              private user: UserService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabContactsForm(service.registeredService);
      if (!this.user.user.administrator
        && (!service.registeredService.contacts || service.registeredService.contacts.length === 0)) {
        const contact: DefaultRegisteredServiceContact = new DefaultRegisteredServiceContact();
        contact.name = this.user.user.firstName + ' ' + this.user.user.familyName;
        contact.email = this.user.user.email;
        contact.phone = this.user.user.phone;
        contact.department = this.user.user.department;
        this.tab.contacts.addRow(contact);
      }
    }
  }
}
