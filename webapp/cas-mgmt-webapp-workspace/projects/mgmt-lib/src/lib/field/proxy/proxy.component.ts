import {Component, Input} from '@angular/core';
import {ProxyType} from '@apereo/mgmt-lib/src/lib/model';
import {ProxyForm, RegExProxyForm} from '@apereo/mgmt-lib/src/lib/form';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update Proxy permissions for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-proxy',
  templateUrl: './proxy.component.html'
})
export class ProxyComponent {

  type: ProxyType;
  TYPE = ProxyType;

  @Input()
  typeControl: FormControl;

  @Input()
  form: ProxyForm;

  /**
   * Cast the form to RegExProxyForm.
   */
  regex(): RegExProxyForm {
    return this.form as RegExProxyForm;
  }
}
