import {Component, Input} from '@angular/core';
import {ServiceTicketExpForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update the service ticket expiration policy.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-service-ticket-exp',
  templateUrl: './service-ticket-exp.component.html',
  styleUrls: ['./service-ticket-exp.component.css']
})
export class ServiceTicketExpComponent {

  @Input()
  form: ServiceTicketExpForm;

}
