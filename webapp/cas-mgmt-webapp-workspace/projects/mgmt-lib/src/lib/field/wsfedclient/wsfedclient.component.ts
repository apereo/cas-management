import {Component, Input} from '@angular/core';
import {WsfedclientForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update WS Federation Client options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-wsfedclient',
  templateUrl: './wsfedclient.component.html'
})
export class WsfedclientComponent {

  @Input()
  form: WsfedclientForm;

}
