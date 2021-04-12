import {Component, Input} from '@angular/core';
import {JwksForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component for display/update jwks keys used for the service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-jwks',
  templateUrl: './jwks.component.html',
  styleUrls: ['./jwks.component.css']
})
export class JwksComponent {

  @Input()
  form: JwksForm;

  constructor() { }

}
