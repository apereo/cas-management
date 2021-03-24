import {Component, Input} from '@angular/core';
import {ProxyTicketExpForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update ProxyTicketExpirationPolicy.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-proxy-ticket-exp',
  templateUrl: './proxy-ticket-exp.component.html',
  styleUrls: ['./proxy-ticket-exp.component.css']
})
export class ProxyTicketExpComponent {

  @Input()
  form: ProxyTicketExpForm;

}
